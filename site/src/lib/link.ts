// Links relativos: o mesmo build funciona na raiz do domínio (Firebase)
// e dentro de uma pasta qualquer (prévia). Com PREVIEW=1 os links levam
// ".html"; em produção ficam limpos (/blog/slug) graças ao cleanUrls.
const preview = process.env.PREVIEW === '1';

export function link(atual: string, destino: string) {
  const [caminho, hash] = destino.split('#');
  const profundidade = atual.replace(/\.html$/, '').split('/').filter(Boolean).length - 1;
  const subir = profundidade > 0 ? '../'.repeat(profundidade) : './';
  let alvo = caminho.replace(/^\//, '');
  if (preview) alvo = alvo === '' ? 'index.html' : `${alvo}.html`;
  const url = subir + alvo;
  return hash ? `${url}#${hash}` : url;
}

export const minutosLeitura = (texto: string) =>
  Math.max(1, Math.round(texto.split(/\s+/).length / 200));

// Para arquivos estáticos (imagens, ícones): relativo, sem mexer na extensão.
export function arquivo(atual: string, destino: string) {
  const profundidade = atual.replace(/\.html$/, '').split('/').filter(Boolean).length - 1;
  return (profundidade > 0 ? '../'.repeat(profundidade) : './') + destino.replace(/^\//, '');
}
