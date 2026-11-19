// Comentários do blog com Firebase (login Google + Firestore).
// Carregado só quando a seção de comentários chega perto da tela.
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
  type Timestamp,
} from 'firebase/firestore';

// Configuração pública do app web (não é segredo; a proteção está no firestore.rules).
const app = initializeApp({
  apiKey: 'AIzaSyCOQDysaC3XEEEIm9smlFqnbzKfJjWrqdM',
  authDomain: 'website-f42b7.firebaseapp.com',
  projectId: 'website-f42b7',
  appId: '1:797823978805:web:aa81a9d644b94945f3907c',
  messagingSenderId: '797823978805',
});

const auth = getAuth(app);
const db = getFirestore(app);
const DONO = 'felipe@pazetto.net';
const MAX = 2000;

type Comentario = {
  id: string;
  post: string;
  texto: string;
  uid: string;
  nome: string;
  foto?: string | null;
  criadoEm: Timestamp | null;
  paiId: string | null;
};

export function iniciarComentarios(raiz: HTMLElement) {
  const post = raiz.dataset.post!;
  const $ = <T extends HTMLElement>(sel: string) => raiz.querySelector<T>(sel)!;

  const lista = $<HTMLOListElement>('[data-lista]');
  const total = $('[data-total]');
  const deslogado = $('[data-deslogado]');
  const form = $<HTMLFormElement>('[data-logado]');
  const texto = $<HTMLTextAreaElement>('#com-texto');
  const contador = $('[data-contador]');
  const erro = $('[data-erro]');
  const respBox = $('[data-resp]');
  const enviar = $<HTMLButtonElement>('[data-enviar]');

  let usuario: User | null = null;
  let respondendo: Comentario | null = null;
  let comentarios: Comentario[] = [];

  const mostrarErro = (msg = '') => {
    erro.textContent = msg;
    erro.hidden = !msg;
  };

  // ---- login ----
  $('[data-entrar]').addEventListener('click', async () => {
    mostrarErro();
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e: any) {
      if (e?.code === 'auth/popup-closed-by-user' || e?.code === 'auth/cancelled-popup-request') return;
      if (e?.code === 'auth/popup-blocked') {
        mostrarErro('O navegador bloqueou a janela de login. Permita pop-ups para pazetto.net e tente de novo.');
      } else {
        mostrarErro('Não foi possível entrar com o Google agora. Tente de novo em instantes.');
      }
    }
  });
  $('[data-sair]').addEventListener('click', () => signOut(auth));

  onAuthStateChanged(auth, (u) => {
    usuario = u;
    deslogado.hidden = !!u;
    form.hidden = !u;
    if (u) {
      $('[data-eu-nome]').textContent = u.displayName || u.email || 'Você';
      $('[data-eu-foto]').replaceChildren(avatar(u.displayName || '?', u.photoURL));
    }
    desenhar();
  });

  // ---- formulário ----
  const atualizarContador = () => {
    const n = texto.value.length;
    contador.textContent = `${n} / ${MAX}`;
    contador.classList.toggle('perto', n > MAX * 0.9);
    enviar.disabled = texto.value.trim().length < 2;
  };
  texto.addEventListener('input', atualizarContador);
  atualizarContador();

  $('[data-cancelar]').addEventListener('click', () => responder(null));

  function responder(c: Comentario | null) {
    respondendo = c;
    respBox.hidden = !c;
    if (c) {
      $('[data-resp-nome]').textContent = c.nome;
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      texto.focus({ preventScroll: true });
    }
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!usuario) return;
    const conteudo = texto.value.trim();
    if (conteudo.length < 2) return;
    mostrarErro();
    enviar.disabled = true;
    enviar.textContent = 'Publicando…';
    try {
      const lote = writeBatch(db);
      lote.set(doc(collection(db, 'comentarios')), {
        post,
        texto: conteudo.slice(0, MAX),
        uid: usuario.uid,
        nome: (usuario.displayName || 'Leitor').slice(0, 80),
        foto: usuario.photoURL ? usuario.photoURL.slice(0, 500) : null,
        criadoEm: serverTimestamp(),
        paiId: respondendo?.id ?? null,
      });
      lote.set(doc(db, 'usuarios', usuario.uid), { ultimo: serverTimestamp() });
      await lote.commit();
      texto.value = '';
      responder(null);
    } catch (e: any) {
      mostrarErro(
        e?.code === 'permission-denied'
          ? 'Espere 30 segundos entre um comentário e outro, e tente de novo.'
          : 'Não foi possível publicar agora. Verifique sua conexão e tente de novo.',
      );
    } finally {
      enviar.textContent = 'Publicar';
      atualizarContador();
    }
  });

  // ---- lista em tempo real ----
  onSnapshot(
    query(collection(db, 'comentarios'), where('post', '==', post)),
    (snap) => {
      comentarios = snap.docs.map(
        (d) => ({ id: d.id, ...d.data({ serverTimestamps: 'estimate' }) }) as Comentario,
      );
      comentarios.sort((a, b) => (a.criadoEm?.toMillis() ?? Date.now()) - (b.criadoEm?.toMillis() ?? Date.now()));
      desenhar();
    },
    () => {
      lista.replaceChildren(vazio('Não foi possível carregar os comentários agora.'));
    },
  );

  function desenhar() {
    const ids = new Set(comentarios.map((c) => c.id));
    // respostas cujo comentário original foi apagado sobem para o primeiro nível
    const raizes = comentarios.filter((c) => !c.paiId || !ids.has(c.paiId));
    total.textContent = comentarios.length ? String(comentarios.length) : '';
    if (!comentarios.length) {
      lista.replaceChildren(vazio('Ainda não há comentários. Seja a primeira pessoa a comentar.'));
      return;
    }
    lista.replaceChildren(
      ...raizes.map((c) => {
        const li = item(c, true);
        const filhos = comentarios.filter((r) => r.paiId === c.id);
        if (filhos.length) {
          const ol = document.createElement('ol');
          ol.className = 'com-respostas';
          ol.append(...filhos.map((r) => item(r, false)));
          li.append(ol);
        }
        return li;
      }),
    );
  }

  function item(c: Comentario, podeResponder: boolean) {
    const li = document.createElement('li');
    li.className = 'com-item';
    li.id = `comentario-${c.id}`;

    const corpo = el('div', 'com-corpo');
    const topo = el('div', 'com-topo');
    const nome = el('strong', 'com-nome', c.nome);
    topo.append(nome);
    if (c.uid && usuario && c.uid === usuario.uid) topo.append(el('span', 'com-selo', 'você'));
    const data = document.createElement('time');
    data.className = 'com-data';
    if (c.criadoEm) {
      const d = c.criadoEm.toDate();
      data.dateTime = d.toISOString();
      data.textContent = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        + ' · ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    topo.append(data);

    const p = el('p', 'com-texto', c.texto);
    const acoes = el('div', 'com-acoes-item');
    if (podeResponder && usuario) {
      const b = botao('Responder', () => responder(c));
      acoes.append(b);
    }
    if (usuario && (usuario.uid === c.uid || usuario.email === DONO)) {
      acoes.append(
        botao('Apagar', async () => {
          if (!confirm('Apagar este comentário? Não dá para desfazer.')) return;
          try {
            await deleteDoc(doc(db, 'comentarios', c.id));
          } catch {
            alert('Não foi possível apagar agora. Tente de novo.');
          }
        }, 'perigo'),
      );
    }
    corpo.append(topo, p);
    if (acoes.childElementCount) corpo.append(acoes);
    li.append(avatar(c.nome, c.foto), corpo);
    return li;
  }
}

function el(tag: string, classe: string, texto?: string) {
  const e = document.createElement(tag);
  e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function botao(rotulo: string, onClick: () => void, extra = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = `com-link ${extra}`.trim();
  b.textContent = rotulo;
  b.addEventListener('click', onClick);
  return b;
}

function vazio(msg: string) {
  return el('li', 'com-vazio', msg);
}

function avatar(nome: string, foto?: string | null) {
  const inicial = el('span', 'com-avatar', (nome.trim()[0] || '?').toUpperCase());
  inicial.setAttribute('aria-hidden', 'true');
  if (!foto) return inicial;
  const img = document.createElement('img');
  img.className = 'com-avatar';
  img.src = foto;
  img.alt = '';
  img.width = 40;
  img.height = 40;
  img.loading = 'lazy';
  img.referrerPolicy = 'no-referrer';
  img.addEventListener('error', () => img.replaceWith(inicial));
  return img;
}
