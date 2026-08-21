# TODO.md — Pendências do projeto

> Lista viva de itens faltando ou pendentes. **Atualizar este arquivo** sempre que algo for resolvido ou quando novos itens pendentes surgirem (entregas do cliente, ativos de mídia, correções).

## 1. Pendências com o cliente (entregas aguardando arquivos)

### Atualização de conteúdo — agosto de 2026 (Eaton, R. STAHL, RS, Oliver)
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
- [ ] **Vídeos adicionais** — ~~planilha menciona vídeos a enviar~~ recebidos e incluídos (ver histórico); restam apenas marcas sem playlist no canal YouTube
- [ ] **Playlists para marcas ainda sem playlist no canal YouTube** — o app agora tem playlists locais para Blinda, Proserv, RS, Stahl e Stopdropp (espelhando os vídeos enviados); confirmar com o cliente se serão criadas no canal @PolarComponentesBrasil (Eaton, Oliver e Parker seguem sem playlist local também)

## 2. Ativos quebrados pré-existentes (faltando no repositório)

> Corrigidos no `main` (rebase): os logos Blinda, Hawke, Hi-Force e Nightstick agora usam `images/placeholder-logo.png`; os vídeos foram transcodificados para h264 com nomes ASCII e thumbnails gerados em `images/<marca>/thumbs/`. Item encerrado.

## 3. Melhorias / acompanhamentos

- [ ] **Confirmar arte gerada no Contato/Quiz** — o logo "todo branco" foi derivado por script do PNG anexado pelo cliente (o anexo é 100% vermelho; convertemos cada pixel opaco para branco em `public/images/logo-polar-branco.png`) e o símbolo "P" (`public/images/simbolo-polar.png`) foi usado no overlay do Quiz; pedir conferência visual do cliente
- [ ] **Integração em nuvem dos leads do quiz** — cadastro pré-quiz (nome/telefone/e-mail) salvo hoje em `leads.csv` local (Electron, pasta userData) ou localStorage (web); depois integrar com sistema em nuvem.
- [ ] **Estrutura de categorias** — cliente pediu na planilha: 12 categorias na 1ª página → subcategorias após clique. Implementado como filtros na página Marcas; se o cliente quiser o fluxo literal (categoria → lista de subcategorias → marca), reavaliar.
- [ ] **Strings de tela RS** — doc define CTA "Toque para explorar as categorias", cabeçalho "Explore as categorias RS" e aviso "Produto representativo — consulte especificações e disponibilidade no site"; não implementados (aplicável se o cliente pedir o fluxo de vitrine da RS).
- [ ] **Tabela de especificações R. STAHL "colorida"** — specs estão em texto nas descrições dos produtos; cliente pediu tabela visual.
- [ ] **Categoria do R. STAHL** — planilha coloca Stahl em "Iluminação Ex" (bloco 3); auditores apontaram que plugues/tomadas talvez fiquem melhor em "Equipamentos Ex" — confirmar com cliente.
- [ ] **Conteúdo menor ausente** — Pelican "projetores Ex", SA EQUIP "aquecimento", Hi-Force cilindros/tensionadores explícitos (planilha cita; sem material recebido).
- [ ] **Contagem inconsistente no doc Oliver** — 3V manifolds: doc diz 4, lista tem 5; DBB: doc diz 6 imagens, lista tem 7 (incluímos todos; confirmar com cliente se necessário).
- [ ] **Traduções en/es** — regeneradas via `pnpm translate`; revisar manualmente (`en.json`, `es.json`) antes de publicar em idioma estrangeiro.
- [ ] **QR Code do kiosk → publicação web** — o QR flutuante (`KioskQrCode`) já aponta para `https://polar.revirtua.com/#<rota-atual>?lng=<idioma>`; só passa a funcionar de verdade quando o web app for publicado em `polar.revirtua.com` (pendente). Testar scan com o EXE após a publicação.

## Resolvidos (histórico)

- [x] ~~Feedback do cliente (ago/2026) — Contato~~ → filial Serra substituída por Cariacica (Km 281); nova filial Votorantim/SP (Blinda); seção de representantes (SP, RS, MG, BA/SE); e-commerce polarb2b.store removido; título "Contato — Polar Group" substituído pelo logo Polar todo branco
- [x] ~~Feedback do cliente (ago/2026) — Quiz~~ → overlay de símbolos "P" da Polar flutuando ao fundo do formulário e das perguntas (motion-reduce respeitado)
- [x] ~~Feedback do cliente (ago/2026) — Playlists~~ → "Playlist" no singular (nav/título), nova frase "organizados por marcas de distribuição", playlists em ordem alfabética; INSTITUCIONAL sem o 3º Encontro Abendi; Nightstick sem XPP Pronta Entrega; SA Equip sem "Sistemas de Iluminação, ventil e energia Ex" (+ 8 vídeos de produto + portfólio); Vantrunk +3, Hawke +2 + ICG/653/UNIV (YouTube), Hi-Force +4, Dropsafe +3, Pelican −duplicata Air Case +3, Atexxo +2, Stopdropp +1; novas playlists Blinda (2 institucionais), RS, Stahl (2), Proserv (2, também na galeria); links YouTube baixados via yt-dlp e transcodificados ≤24 MiB
- [x] ~~Eaton: conflito 100 vs 162 lm/W~~ → usado 162 lm/W
- [x] ~~Typos do cliente~~ → "coação"→"cotação", "Sistrema"→"Sistema", etc.
- [x] ~~Vídeo Chalmit (nome com espaço duplo)~~ → resolvido no main com transcodificação/renomeação dos vídeos (nomes ASCII)
- [x] ~~Vídeo Hi-Force TWH-N (espaço no nome)~~ → resolvido no main com transcodificação/renomeação dos vídeos
- [x] ~~Logos Blinda/Hawke/Hi-Force/Nightstick quebrados~~ → resolvido no main (placeholder-logo.png até receber os logos reais)
- [x] ~~Logos faltantes (Blinda, Eaton, Hawke, Hi-Force, Nightstick, RS, R. STAHL)~~ → baixados dos sites oficiais (wikimedia para Eaton, hi-force.com, nightstick.com, us.rs-online.com, r-stahl.com, polarb2b.com para Blinda, ctfassets para Hawke); Nightstick invertido (branco → preto), Hi-Force com fundo removido; dados preenchidos em `companies/pt-BR.json`, `en.json` e `es.json`
- [x] ~~Auditoria 5 arquivos do cliente~~ → gaps corrigidos: "Powering Business Worldwide" + subtítulo Eaton, recursos inteligentes (Brightlayer/BLE), aplicações e detalhes de engenharia do GHG51, portfólio elétrico Eaton (disjuntores/painéis/proteção), público-alvo R. STAHL, linha Eclipse X (Chalmit), specs completas das válvulas pipeline Oliver (materiais, fire safe, vent, XM-19), tagline Atexxo completa, tagline Home "O produto certo quando você mais precisa"
- [x] ~~Installer Squirrel truncado (~600 MB)~~ → root cause: `rcedit.exe` (x86) corrompia o `Setup.exe` de ~1,2 GB após o embed do zip (exit 0, zip descartado); corrigido adicionando `rcedit.exe` ao patch LAA em `scripts/patch-squirrel-laa.mjs` (commit `840743a`, já no `main`)
- [x] ~~12 vídeos acima de 25 MiB bloqueavam o deploy do Cloudflare Pages~~ → limite do Pages é 25 MiB por arquivo; transcodificados com `scripts/compress-videos.ps1` (h264 two-pass, ≤24 MB, 720p para clipes longos). **Novos vídeos do cliente devem passar por esse script antes de commit** — caso contrário o deploy web falha na validação de assets.
- [x] ~~Vídeo institucional Polar Group fora da Home~~ → nova Home com coluna compartilhada + marquee de logos; Quem Somos reformulado em duas colunas com vídeo institucional à direita e popups de Missão/Visão/Valores à esquerda
- [x] ~~Vídeos Blinda na página Vídeos~~ → os 2 vídeos "Blinda 2026" (FULLHD + legenda) foram movidos para a galeria da Blinda
- [x] ~~Página Vídeos~~ → substituída pela página Playlists, que espelha as playlists públicas do canal @PolarComponentesBrasil (vídeos baixados com `scripts/download-playlists.ps1` + yt-dlp e transcodificados para ≤24 MiB)
- [x] ~~Dados de contato desatualizados~~ → atualizados com endereço/telefones/e-mails reais do site polarb2b.com + foto da loja
- [x] ~~"Grupo Polar" em strings visíveis~~ → padronizado "Polar Group" (pt-BR, en, es)
- [x] ~~Logos com problema~~ → Parker e Hi-Force substituídos pelos arquivos oficiais originais sem efeitos (parker.com `parker_logo.png` e hi-force.com `logo-white.jpg`); margens transparentes verticais/horizontais removidas de Chalmit, Dropsafe, Oliver, Proserv, Pelican, SA Equip, Stopdropp e Vantrunk
