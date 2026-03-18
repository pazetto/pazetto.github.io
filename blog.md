---
layout: default
title: Blog
nav_order: 3
has_children: true
---

# Artigos e Insights

Acompanhe meus textos sobre SQL, TOTVS, infraestrutura e o dia a dia na área de dados.

---

<style>
  /* Estilo dos Cards do Blog */
  .post-card {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding-bottom: 25px;
    border-bottom: 1px solid #333; /* Linha divisória discreta */
    align-items: flex-start;
  }
  
  .post-card-img {
    flex: 0 0 35%; /* A imagem ocupa 35% da largura */
    max-width: 250px;
  }
  
  .post-card-img img {
    width: 100%;
    border-radius: 8px; /* Bordas arredondadas na imagem */
    object-fit: cover;
    aspect-ratio: 16 / 9; /* Mantém a imagem padrão formato de tela */
  }
  
  .post-card-content {
    flex: 1;
  }
  
  .post-card-title {
    margin-top: 0 !important;
    margin-bottom: 8px !important;
    font-size: 1.4em;
  }
  
  .post-card-meta {
    font-size: 0.8em;
    color: #888;
    margin-bottom: 12px;
  }
  
  .post-card-desc {
    color: #ccc;
    font-size: 0.95em;
    line-height: 1.5;
    margin-bottom: 0;
  }

  /* Responsividade: No celular a imagem fica em cima */
  @media (max-width: 768px) {
    .post-card {
      flex-direction: column;
    }
    .post-card-img {
      flex: 100%;
      max-width: 100%;
    }
  }
</style>

<div class="post-list">
  {% for post in site.posts %}
  <div class="post-card">
    
    {% if post.image %}
    <div class="post-card-img">
      <a href="{{ site.baseurl }}{{ post.url }}">
        <img src="{{ post.image | relative_url }}" alt="Capa do post: {{ post.title }}">
      </a>
    </div>
    {% endif %}
    
    <div class="post-card-content">
      <h2 class="post-card-title">
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      </h2>
      <div class="post-card-meta">
        Publicado em: {{ post.date | date: "%d/%m/%Y" }}
      </div>
      <p class="post-card-desc">
        {% if post.description %}
          {{ post.description }}
        {% else %}
          {{ post.excerpt | strip_html | truncatewords: 25 }}
        {% endif %}
      </p>
    </div>
    
  </div>
  {% endfor %}
</div>