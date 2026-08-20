# TODO.md — Pendências do projeto

> Lista viva de itens faltando ou pendentes. **Atualizar este arquivo** sempre que algo for resolvido ou quando novos itens pendentes surgirem (entregas do cliente, ativos de mídia, correções).

## 1. Pendências com o cliente (entregas aguardando arquivos)

### Atualização de conteúdo — agosto de 2026 (Eaton, R. STAHL, RS, Oliver)
- [ ] **Logo R. STAHL** (vetor/alta resolução) — aguardando arquivo; fallback textual no app
- [ ] **Logo RS Components** (vetor/alta resolução) — aguardando arquivo; fallback textual no app
- [ ] **Logos reais Blinda, Hawke, Hi-Force e Nightstick** — solicitar os arquivos ao cliente; fallback textual no app
- [ ] **Logo Eaton real** — o arquivo enviado como "logo-eaton.png" era na verdade a logo do Polar Group (agora em images/logo-polar-group.png); Eaton está com fallback textual até o cliente enviar a logo correta
- [ ] **Logos Blinda, Hawke, Hi-Force, Nightstick, RS e R. STAHL** — `images/placeholder-logo.png` estava corrompido; app agora usa fallback textual (logo vazia nos dados) até o cliente enviar os arquivos reais
- [ ] **Imagens de produtos faltantes** — ~20 produtos (Hawke, Hi-Force, Nightstick, Parker, Pelican, StopDropp) sem foto real; app usa placeholder animado até envio
- [ ] **Tagline Chalmit duplicada** — Chalmit usa a mesma tagline da Hawke ("Eletrifique e Energize… desde 1888"), mas a descrição da Chalmit diz "desde 1910"; confirmar com o cliente qual é a tagline correta da Chalmit
- [ ] **Datasheets Oliver Valves** (~20 PDFs referenciados no doc de conteúdo, ex.: `B10F-Ball-Valve.pdf`, `Y24-Y25-Type.pdf`) — nunca enviados
- [ ] **Datasheets R. STAHL** — doc diz "INCLUIR OS DATASHEETS anexados no e-mail"; criar link por série quando recebidos
- [ ] **Link do vídeo Oliver Twinsafe** — o doc só diz "INCLUIR LINK PARA VÍDEO SOBRE OLIVER TWINSAFE", sem URL
- [ ] **Logo RS oficial para sobreposição nas 6 imagens de categoria** (doc RS: "fornecido em anexo" — não recebido)
- [ ] **Imagem da Tela 5 "Diferenciais Técnicos" (R. STAHL)** — o doc tem 7 imagens para 8 telas; solicitar ao cliente
- [ ] **Foto da válvula Trunnion DBB compacta (Oliver 2.1.8)** — doc não tem foto dedicada; usando ícone genérico
- [ ] **Confirmar eficácia NLE Eaton** — deck mostra 100 lm/W (bullet) e 162 lm/W (destaque); usamos 162
- [ ] **Confirmar nº de itens RS** — doc diz "500.000 produtos"; planilha diz "Mais de 1 milhão de itens"
- [ ] **Confirmar URL RS** — doc pede `br.rsdelivers.com/?cm_mmc=...` (com parâmetros de tracking); usamos URL limpa
- [ ] **Especificações e fotos da linha Eclipse X (Chalmit)** — planilha cita a linha; entrada criada sem specs/mídia
- [ ] **Fotos reais de produtos RS ("Produtos Representativos")** — doc pede galeria com fotos do catálogo RS; não enviadas

### Planilha de marcas (rev04 — 12/08/2026)
- [ ] **Catálogo digital Blinda em PDF** — "a ser enviado dia 13/08" (substituir `pdfs/catalogo-blinda.pdf`?)
- [ ] **Catálogos Vantrunk** — 3 brochures em PDF (inglês) "a enviar"
- [ ] **Parker** — planilha marca "Material a ser enviado" (linhas PIPE, Autoclave, A-Lok, MPI — ainda não representadas no app)
- [ ] **Material Proserv** — planilha marca "Não usar o enviado"
- [ ] **Material Oliver** — planilha marca "Material a ser enviado" (recebido depois via docx — confirmar se cobre tudo)
- [ ] **Vídeos adicionais** — planilha menciona vídeos a enviar para algumas marcas (ex.: Pelican "vídeos a enviar", Blinda "Usar o vídeo institucional Blinda")

## 2. Ativos quebrados pré-existentes (faltando no repositório)

> Corrigidos no `main` (rebase): os logos Blinda, Hawke, Hi-Force e Nightstick agora usam `images/placeholder-logo.png`; os vídeos foram transcodificados para h264 com nomes ASCII e thumbnails gerados em `images/<marca>/thumbs/`. Item encerrado.

## 3. Melhorias / acompanhamentos

- [ ] **Estrutura de categorias** — cliente pediu na planilha: 12 categorias na 1ª página → subcategorias após clique. Implementado como filtros na página Marcas; se o cliente quiser o fluxo literal (categoria → lista de subcategorias → marca), reavaliar.
- [ ] **Vídeo institucional Polar Group na Home** — planilha define Home = vídeo institucional + tagline; a tagline "O produto certo quando você mais precisa" já está no subtítulo da Home, mas o vídeo ainda aparece só na página Vídeos.
- [ ] **Strings de tela RS** — doc define CTA "Toque para explorar as categorias", cabeçalho "Explore as categorias RS" e aviso "Produto representativo — consulte especificações e disponibilidade no site"; não implementados (aplicável se o cliente pedir o fluxo de vitrine da RS).
- [ ] **Tabela de especificações R. STAHL "colorida"** — specs estão em texto nas descrições dos produtos; cliente pediu tabela visual.
- [ ] **Categoria do R. STAHL** — planilha coloca Stahl em "Iluminação Ex" (bloco 3); auditores apontaram que plugues/tomadas talvez fiquem melhor em "Equipamentos Ex" — confirmar com cliente.
- [ ] **Conteúdo menor ausente** — Pelican "projetores Ex", SA EQUIP "aquecimento", Hi-Force cilindros/tensionadores explícitos (planilha cita; sem material recebido).
- [ ] **Contagem inconsistente no doc Oliver** — 3V manifolds: doc diz 4, lista tem 5; DBB: doc diz 6 imagens, lista tem 7 (incluímos todos; confirmar com cliente se necessário).
- [ ] **Traduções en/es** — regeneradas via `pnpm translate`; revisar manualmente (`en.json`, `es.json`) antes de publicar em idioma estrangeiro.

## Resolvidos (histórico)

- [x] ~~Eaton: conflito 100 vs 162 lm/W~~ → usado 162 lm/W
- [x] ~~Typos do cliente~~ → "coação"→"cotação", "Sistrema"→"Sistema", etc.
- [x] ~~Vídeo Chalmit (nome com espaço duplo)~~ → resolvido no main com transcodificação/renomeação dos vídeos (nomes ASCII)
- [x] ~~Vídeo Hi-Force TWH-N (espaço no nome)~~ → resolvido no main com transcodificação/renomeação dos vídeos
- [x] ~~Logos Blinda/Hawke/Hi-Force/Nightstick quebrados~~ → resolvido no main (placeholder-logo.png até receber os logos reais)
- [x] ~~Auditoria 5 arquivos do cliente~~ → gaps corrigidos: "Powering Business Worldwide" + subtítulo Eaton, recursos inteligentes (Brightlayer/BLE), aplicações e detalhes de engenharia do GHG51, portfólio elétrico Eaton (disjuntores/painéis/proteção), público-alvo R. STAHL, linha Eclipse X (Chalmit), specs completas das válvulas pipeline Oliver (materiais, fire safe, vent, XM-19), tagline Atexxo completa, tagline Home "O produto certo quando você mais precisa"
- [x] ~~Installer Squirrel truncado (~600 MB)~~ → root cause: `rcedit.exe` (x86) corrompia o `Setup.exe` de ~1,2 GB após o embed do zip (exit 0, zip descartado); corrigido adicionando `rcedit.exe` ao patch LAA em `scripts/patch-squirrel-laa.mjs` (commit `840743a`, já no `main`)
