---
layout: default
title: Blog
nav_order: 3
has_children: true
---

# Artigos e Insights

Acompanhe meus textos sobre SQL, TOTVS, infraestrutura, dia a dia na área de dados e off-topics

---

## Postagens Recentes

<ul>
{% for post in site.posts %}
  <li style="margin-bottom: 15px;">
    <strong><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></strong><br>
    <span style="font-size: 0.8em; color: #666;">Publicado em: {{ post.date | date: "%d/%m/%Y" }}</span>
  </li>
{% endfor %}
</ul>
