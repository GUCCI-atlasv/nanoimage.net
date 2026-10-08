import type { CategoryHubPagesPartial } from './types'

export const ptCategoryHubPages: CategoryHubPagesPartial = {
  'optimize-images': {
    seo: {
      title: 'Otimizar imagens online – Comprimir, redimensionar e ampliar',
      description:
        'Otimize imagens online grátis. Comprima, redimensione, comprima em lote e amplie JPG, PNG, WebP e GIF diretamente no navegador, sem cadastro ou envio.',
      h1: 'Otimizar imagens online',
      hero:
        'Deixe imagens menores, mais nítidas e fáceis de compartilhar. Ferramentas gratuitas no navegador para comprimir, redimensionar, otimizar em lote ou ampliar sem enviar seus arquivos.',
    },
    introMarkdown: `## Otimize imagens online para sites mais rápidos, compartilhamento mais fácil e melhor qualidade

A otimização de imagens é uma das formas mais simples de tornar o trabalho digital mais rápido e fácil. Arquivos grandes deixam sites lentos, demoram para enviar, enchem anexos de e-mail e muitas vezes falham quando um formulário tem limite rígido de tamanho. O NanoImage oferece um conjunto focado de [ferramentas de otimização de imagens](/tools/optimize-images) online gratuitas para reduzir tamanho, alterar dimensões, comprimir vários arquivos ou ampliar uma imagem de baixa resolução diretamente no navegador.

A categoria Otimizar imagens serve para tarefas do dia a dia: comprimir um JPG antes de enviar por e-mail, redimensionar um PNG para banner web, reduzir um WebP para carregamento mais rápido ou ampliar uma imagem pequena para ficar mais clara em uma apresentação. Cada ferramenta é simples o bastante para edições rápidas, com controles úteis como formato de saída, qualidade, dimensões e tamanho alvo.

Use [Comprimir imagem online](/compress-image) quando o objetivo principal for reduzir o arquivo. A compressão é útil para imagens de blog, fotos de produto, formulários, envios de documentos e recursos para redes sociais. Para cumprir um limite específico, use compressores de tamanho alvo como [100 KB](/compress-image-to-100kb), [200 KB](/compress-image-to-200kb), [500 KB](/compress-image-to-500kb) ou [1 MB](/compress-image-to-1mb).

Use [Redimensionar imagem online](/resize-image) quando as dimensões forem o problema. Uma foto do celular pode ter 4000 pixels de largura, mas uma miniatura web pode precisar de 1200 ou menos. Redimensionar reduz muito o tamanho mantendo a imagem clara para o uso previsto.

Use [Comprimir em lote](/batch-compress) quando tiver várias imagens para preparar de uma vez. Em vez de enviar e baixar um por um, processe um grupo junto. Útil para vendedores de e-commerce, blogueiros, designers, estudantes e quem prepara muitas fotos para publicar ou compartilhar.

Use [Ampliar imagem online](/upscale-image) quando a imagem for pequena demais e precisar parecer mais nítida em tamanho maior. Ampliar ajuda com capturas antigas, fotos pequenas de produto, imagens sociais ou imagens que precisam caber em um layout maior.

O NanoImage se diferencia porque a otimização ocorre no navegador sempre que possível. Suas imagens são processadas localmente no dispositivo, em vez de serem enviadas a um servidor. Isso acelera o fluxo para muitos arquivos e protege fotos privadas, documentos pessoais, rascunhos de produto e trabalhos de clientes.

Para o melhor resultado, escolha a ferramenta conforme o problema. Arquivo grande demais: comprima. Largura ou altura errada: redimensione. Muitos arquivos: comprima em lote. Imagem pequena demais: amplie. Também pode combinar: redimensionar e comprimir; converter para WebP e comprimir; ou remover EXIF antes de publicar.`,
    scenarios: [
      { question: 'Precisa de um arquivo menor?', toolSlug: 'compress-image' },
      { question: 'Precisa de limite exato (100 KB)?', toolSlug: 'compress-image-to-100kb' },
      { question: 'Precisa de limite exato (200 KB)?', toolSlug: 'compress-image-to-200kb' },
      { question: 'Precisa de novas dimensões?', toolSlug: 'resize-image' },
      { question: 'Precisa de vários arquivos de uma vez?', toolSlug: 'batch-compress' },
      { question: 'Precisa de uma imagem maior?', toolSlug: 'upscale-image' },
    ],
    faqs: [
      { q: 'As ferramentas de otimização do NanoImage são gratuitas?', a: 'Sim. Comprimir, redimensionar, comprimir em lote e ampliar são gratuitos, sem cadastro para os fluxos principais.' },
      { q: 'Comprimir ou redimensionar primeiro?', a: 'Redimensione primeiro se as dimensões não couberem na plataforma. Comprima se o arquivo for grande demais. Muitos fluxos combinam os dois passos.' },
      { q: 'A compressão reduz a qualidade visível?', a: 'Com configurações sensatas (geralmente 80–92 para JPG/WebP), as fotos costumam parecer quase idênticas enquanto o tamanho cai bastante.' },
      { q: 'Meus arquivos são enviados ao servidor?', a: 'O NanoImage processa imagens no navegador quando suportado. Seus arquivos permanecem no dispositivo durante a otimização.' },
      { q: 'Qual formato é melhor para sites?', a: 'WebP costuma gerar arquivos menores que JPG para fotos. PNG é melhor para transparência e gráficos nítidos. Converta para WebP e comprima se necessário.' },
    ],
    howItWorks: [
      'Envie ou solte sua imagem no navegador — sem conta.',
      'Escolha compressão, redimensionar, lote ou ampliar e visualize o resultado.',
      'Baixe na hora. Combine com converter ou remover EXIF se o fluxo exigir.',
    ],
  },
  'edit-images': {
    seo: {
      title: 'Editar imagens online – Recortar, girar, espelhar e melhorar',
      description:
        'Edite imagens online grátis. Recorte, gire, espelhe, adicione texto, mude fundo, melhore fotos e ajuste cores com privacidade no navegador. Sem cadastro ou marca d\'água.',
      h1: 'Editar imagens online',
      hero:
        'Edições rápidas sem instalar software. Recorte, gire, espelhe, adicione texto, mude fundos, melhore fotos e ajuste cores com ferramentas gratuitas no navegador.',
    },
    introMarkdown: `## Edite imagens online sem instalar software

Você nem sempre precisa de um editor de fotos complexo para uma mudança útil. A maioria das tarefas é simples: recortar espaço extra, girar foto de lado, espelhar, adicionar texto, mudar cor de fundo, melhorar foto escura ou preparar foto de identidade. O NanoImage reúne essas [ferramentas para editar imagens online](/tools/edit-images) em um espaço rápido, gratuito e baseado no navegador.

Use [Recortar imagem online](/crop-image) para remover áreas indesejadas, focar no assunto ou ajustar uma proporção. O recorte serve para fotos de perfil, miniaturas, imagens de e-commerce, capas de blog, documentos e posts sociais.

Use [Girar imagem online](/rotate-image) quando a foto aparecer de lado ou de cabeça para baixo — comum ao mover imagens entre celulares, câmeras, apps e sites.

Use [Espelhar imagem online](/flip-image) para efeito espelho horizontal ou vertical. Útil para selfies, layouts de design, material escaneado, orientação de produto e efeitos criativos.

Use [Adicionar texto à imagem](/add-text) para legendas, rótulos, instruções, memes, miniaturas ou gráficos promocionais simples.

Use [Mudar fundo](/change-background) quando a cor de fundo não combinar com o uso final. Útil para imagens de produto, fotos tipo documento, gráficos simples e anúncios de e-commerce.

Use [Melhorar imagem](/enhance-image) para ajustes rápidos — brilho, contraste, saturação, nitidez e clareza.

Use [Mudar cor](/change-color) para substituir, ajustar ou tingir cores.

Use [Criador de foto para passaporte](/passport-photo) para formato oficial com controle de tamanho, fundo e peso do arquivo.

Um bom fluxo de edição combina várias ferramentas: recortar, [redimensionar online](/resize-image), [comprimir online](/compress-image) e depois [remover dados EXIF](/remove-exif) antes de publicar. A maior vantagem do NanoImage é simplicidade e privacidade — edição rápida no navegador, sem cadastro e sem marca d'água no download.`,
    scenarios: [
      { question: 'Precisa reenquadrar ou mudar a proporção?', toolSlug: 'crop-image' },
      { question: 'Foto de lado ou de cabeça para baixo?', toolSlug: 'rotate-image' },
      { question: 'Precisa de efeito espelho?', toolSlug: 'flip-image' },
      { question: 'Precisa de legendas ou rótulos?', toolSlug: 'add-text' },
      { question: 'Precisa de fundo limpo?', toolSlug: 'change-background' },
      { question: 'Precisa de correções rápidas de qualidade?', toolSlug: 'enhance-image' },
      { question: 'Precisa de foto para passaporte ou visto?', toolSlug: 'passport-photo' },
    ],
    faqs: [
      { q: 'Preciso instalar software?', a: 'Não. Todas as ferramentas de edição rodam no navegador em desktop e mobile.' },
      { q: 'Diferença entre recortar e redimensionar?', a: 'Recortar remove partes para mudar o enquadramento. Redimensionar altera as dimensões em pixels da imagem inteira.' },
      { q: 'Posso girar e espelhar no mesmo fluxo?', a: 'Sim. Corrija a orientação com Girar imagem e espelhe se necessário.' },
      { q: 'As edições adicionam marca d\'água?', a: 'Não. Os downloads do NanoImage ficam limpos, sem marca d\'água da ferramenta.' },
      { q: 'Minhas fotos são enviadas?', a: 'O processamento ocorre no navegador quando suportado. Os arquivos permanecem no dispositivo.' },
    ],
    howItWorks: [
      'Abra a ferramenta de edição — recortar, girar, espelhar, texto e mais.',
      'Envie sua imagem e ajuste as configurações no navegador.',
      'Baixe o arquivo editado. Redimensione ou comprima se a plataforma tiver limites de tamanho.',
    ],
  },
  'convert-formats': {
    seo: {
      title: 'Converter formatos de imagem online – JPG, PNG, WebP, PDF',
      description:
        'Converta formatos de imagem online grátis. Altere JPG, PNG, WebP, GIF e outros arquivos no navegador, sem cadastro e com download instantâneo.',
      h1: 'Converter formatos de imagem online',
      hero:
        'Converta imagens para o formato que precisa. Transforme JPG, PNG, WebP, GIF e outros arquivos em formatos prontos para web ou documentos diretamente no navegador.',
    },
    introMarkdown: `## Converta formatos de imagem online para sites, documentos e compartilhamento

Cada formato de imagem serve a um propósito. JPG é comum em fotos, PNG útil para transparência e capturas, WebP ótimo para arquivos web leves, GIF suporta animação e PDF costuma ser exigido para documentos ou envios. A categoria [converter formatos de imagem online](/tools/convert-formats) do NanoImage ajuda a mudar arquivos sem instalar software.

Use [Converter imagem online](/convert-image) para um conversor geral de JPG, PNG, WebP, GIF, BMP e mais. Use [Converter JPG/PNG para WebP](/convert-to-webp) ao preparar imagens para sites ou páginas focadas em desempenho — WebP costuma criar arquivos menores com boa qualidade visual.

Use [Conversor de imagem para PDF](/image-to-pdf) para transformar uma ou mais imagens em documento: recibos, formulários escaneados, trabalhos, documentos de identidade ou arquivos imprimíveis.

A escolha do formato depende do uso final. JPG para fotos comuns sem transparência. PNG para capturas, gráficos e logos. WebP para web quando o tamanho importa. PDF quando a imagem deve ser enviada, impressa ou compartilhada como documento.

A conversão de formato muitas vezes faz parte de um fluxo maior: redimensionar um PNG grande, converter para WebP e depois [comprimir online](/compress-image). Ou converter foto do celular para JPG para um formulário e comprimir para cumprir um limite. O NanoImage mantém o fluxo simples — enviar, escolher formato de saída, baixar.

Muitos buscam porque um requisito de envio bloqueia: «só JPG», «deve ser WebP» ou «enviar como PDF». Este hub ajuda a entender qual ferramenta resolve o problema e leva direto a ela. O processamento no navegador, com foco em privacidade, importa porque usuários costumam converter identidades sensíveis, recibos, gráficos comerciais e ativos de clientes.`,
    scenarios: [
      { question: 'Não sabe qual conversor usar?', toolSlug: 'convert-image' },
      { question: 'Precisa de arquivos web menores?', toolSlug: 'convert-to-webp' },
      { question: 'Precisa de documento a partir de imagens?', toolSlug: 'image-to-pdf' },
      { question: 'Arquivo ainda grande após converter?', toolSlug: 'compress-image' },
    ],
    faqs: [
      { q: 'JPG vs PNG vs WebP — qual usar?', a: 'JPG para fotos, PNG para transparência e gráficos nítidos, WebP para arquivos web menores com boa qualidade.' },
      { q: 'Posso converter várias imagens de uma vez?', a: 'Converter imagem suporta conversão em lote em muitos fluxos comuns.' },
      { q: 'O que acontece com a transparência ao converter para JPG?', a: 'JPG não tem canal alpha. Áreas transparentes viram cor de fundo sólida que você escolhe.' },
      { q: 'Posso converter imagens para PDF?', a: 'Sim. Imagem para PDF une até 20 imagens em um PDF com controle de tamanho de página e margens.' },
      { q: 'As conversões são processadas localmente?', a: 'Sim, quando suportado — os arquivos são processados no navegador em vez de serem enviados para conversão.' },
    ],
    howItWorks: [
      'Escolha Converter imagem, WebP ou PDF conforme sua necessidade de saída.',
      'Envie arquivos e selecione formato alvo e opções de qualidade.',
      'Baixe os arquivos convertidos. Comprima ou redimensione se a plataforma tiver limites.',
    ],
  },
  'create-more': {
    seo: {
      title: 'Criar imagens online – GIFs, memes, colagens e grades',
      description:
        'Crie imagens online grátis. Faça GIFs, memes, colagens de fotos, grades de fotos e grades de desenho no navegador, sem cadastro ou marca d\'água.',
      h1: 'Criar imagens online',
      hero:
        'Transforme fotos em visuais compartilháveis. Crie GIFs, memes, colagens, grades de fotos e grades de desenho com ferramentas simples e gratuitas no navegador.',
    },
    introMarkdown: `## Crie imagens, GIFs, memes, colagens e grades compartilháveis

Imagens não são só para editar — também para criar. A categoria [criar imagens online](/tools/create-more) do NanoImage reúne ferramentas para produzir conteúdo visual a partir de fotos existentes ou layouts em branco.

Use [Criador de GIF](/gif-maker) para transformar várias imagens em GIF animado — útil para reações, prévias de produto, sequências antes/depois e explicações visuais leves.

Use [Gerador de memes](/meme-generator) para adicionar texto em negrito em cima e embaixo rapidamente. Para mais controle de fontes e camadas, experimente [Adicionar texto à imagem](/add-text).

Use [Criador de colagem](/image-collage) para combinar várias fotos em um design — posts do Instagram, mood boards, resumos de eventos e vitrines de produto.

Use [Grade de fotos](/photo-grid) para layouts estruturados 2×2, 3×3 e 4×4 — portfólios, comparações e posts sociais que precisam de alinhamento e consistência.

Use [Criador de grade](/grid-maker) para adicionar grade de desenho a uma foto de referência ou criar grades imprimíveis em branco para artistas, estudantes e professores.

Fluxos criativos costumam usar várias ferramentas: [recortar online](/crop-image) antes de uma colagem, [redimensionar online](/resize-image) antes de uma grade, [comprimir online](/compress-image) antes de enviar, ou [adicionar marca d'água](/add-watermark) ao gráfico final. O NanoImage mantém a criação leve — rápida, gratuita, privada e sem cadastro.`,
    scenarios: [
      { question: 'Precisa de GIF animado?', toolSlug: 'gif-maker' },
      { question: 'Precisa de texto estilo meme?', toolSlug: 'meme-generator' },
      { question: 'Combinar várias fotos?', toolSlug: 'image-collage' },
      { question: 'Precisa de grade alinhada?', toolSlug: 'photo-grid' },
      { question: 'Precisa de grade de referência para desenho?', toolSlug: 'grid-maker' },
    ],
    faqs: [
      { q: 'GIF vs vídeo — quando usar o criador de GIF?', a: 'GIFs funcionam melhor para loops curtos, reações e animações simples sem player de vídeo.' },
      { q: 'Colagem vs grade de fotos?', a: 'Colagens são layouts criativos livres. Grades de fotos enfatizam células iguais e alinhamento limpo.' },
      { q: 'Os downloads têm marca d\'água?', a: 'Não. O NanoImage não adiciona marcas d\'água a imagens ou GIFs criados.' },
      { q: 'Posso adicionar texto após fazer um meme?', a: 'Sim. O gerador de memes é o mais rápido para layouts clássicos; Adicionar texto oferece mais controle tipográfico.' },
      { q: 'Preciso de conta?', a: 'Não é necessária conta para as ferramentas principais de criação.' },
    ],
    howItWorks: [
      'Escolha GIF, meme, colagem, grade ou grade de desenho conforme sua saída.',
      'Envie imagens ou configure o layout no navegador.',
      'Baixe sua criação. Redimensione ou comprima antes de publicar nas redes.',
    ],
  },
  'privacy-protection': {
    seo: {
      title: 'Ferramentas de privacidade de imagem – EXIF, desfoque, pixelização e marca d\'água',
      description:
        'Proteja a privacidade de imagens online. Remova EXIF, desfoque rostos, pixelize áreas sensíveis e adicione marcas d\'água no navegador, sem cadastro ou envio.',
      h1: 'Ferramentas de privacidade e proteção de imagens',
      hero:
        'Proteja detalhes sensíveis antes de compartilhar. Remova metadados, desfoque áreas privadas, pixelize rostos ou placas e adicione marcas d\'água diretamente no navegador.',
    },
    introMarkdown: `## Proteja suas imagens antes de compartilhar online

Cada imagem pode conter mais informação do que você imagina — metadados de localização, detalhes da câmera, carimbos de data/hora, rostos, placas, endereços e detalhes privados do fundo. As [ferramentas de privacidade de imagem](/tools/privacy-protection) do NanoImage ajudam a preparar imagens para compartilhamento mais seguro.

Use [Remover dados EXIF](/remove-exif) para eliminar metadados ocultos de fotos. EXIF pode incluir modelo da câmera, data, hora e às vezes localização GPS. Remover metadados é útil antes de compartilhar fotos de viagem, imagens pessoais, trabalhos de clientes, capturas ou documentos online.

Use [Desfocar imagem online](/blur-image) para ocultar informação mantendo a imagem natural — rostos, endereços, placas, números de conta e detalhes de fundo.

Use [Pixelizar imagem online](/pixelate-image) para privacidade visual mais forte. Pixelização é comum para censurar rostos, documentos, placas e áreas sensíveis em capturas.

Use [Adicionar marca d'água à imagem](/add-watermark) para proteger propriedade ou desencorajar reutilização não autorizada com texto ou logo.

A privacidade de imagens tem duas camadas: detalhes visíveis e metadados ocultos. Um fluxo completo pode exigir ambos — [remover dados EXIF](/remove-exif) e desfocar ou pixelizar áreas sensíveis. O NanoImage enfatiza processamento no navegador para que usuários focados em privacidade não precisem enviar imagens sensíveis a servidores desconhecidos.

Casos comuns: ocultar rostos em fotos de sala de aula, remover GPS de fotos do celular, desfocar placas antes de publicar foto de carro, pixelizar nomes de usuário em capturas e adicionar marcas d'água a fotografia de produto antes de compartilhar publicamente.`,
    scenarios: [
      { question: 'Precisa remover metadados ocultos?', toolSlug: 'remove-exif' },
      { question: 'Precisa ocultar rostos ou placas?', toolSlug: 'blur-image' },
      { question: 'Precisa de censura evidente?', toolSlug: 'pixelate-image' },
      { question: 'Precisa proteger propriedade?', toolSlug: 'add-watermark' },
    ],
    faqs: [
      { q: 'O que são dados EXIF?', a: 'EXIF são metadados embutidos em muitas fotos — configurações da câmera, data, hora e às vezes coordenadas GPS.' },
      { q: 'Desfoque vs pixelização — qual é melhor?', a: 'Desfoque parece natural em rostos; pixelização é mais difícil de reverter e sinaliza censura intencional. Desfoque ou pixelização forte para texto e números.' },
      { q: 'Desfoque remove EXIF?', a: 'Não. Remova metadados separadamente com Remover EXIF após a censura visual.' },
      { q: 'As ferramentas de privacidade são gratuitas?', a: 'Sim. As ferramentas principais são gratuitas, sem cadastro.' },
      { q: 'Meus arquivos sensíveis são enviados?', a: 'O NanoImage processa arquivos no navegador quando suportado — verifique em DevTools → Network durante o processamento.' },
    ],
    howItWorks: [
      'Envie a imagem que planeja compartilhar publicamente.',
      'Remova EXIF, desfoque, pixelize ou adicione marca d\'água conforme necessário — muitas vezes em combinação.',
      'Baixe e revise a imagem final antes de publicar.',
    ],
  },
  'ai-tools': {
    seo: {
      title: 'Ferramentas de imagem com IA grátis online — no dispositivo, sem upload',
      description:
        'Remoção de fundo com IA, apagador de objetos, restauração de fotos e corte inteligente, tudo rodando no seu navegador. Suas imagens nunca saem do dispositivo. Grátis, sem cadastro, sem marca d\'água.',
      h1: 'Ferramentas de imagem com IA — no dispositivo, sem upload',
      hero:
        'Ferramentas de imagem com IA que continuam sem enviar suas fotos. Os modelos são baixados uma vez para o navegador e toda a inferência roda localmente.',
    },
  },
  'video-tools': {
    seo: {
      title: 'Ferramentas de vídeo online grátis – Converter vídeo para GIF ou MP3',
      description:
        'Use ferramentas de vídeo online grátis para converter clipes em GIF ou extrair áudio MP3. Ferramentas rápidas no navegador, sem cadastro e downloads simples.',
      h1: 'Ferramentas de vídeo online grátis',
      hero:
        'Converta clipes curtos em GIFs compartilháveis ou extraia áudio como MP3. Ferramentas de vídeo simples e gratuitas para fluxos rápidos no navegador.',
    },
    introMarkdown: `## Ferramentas de vídeo online simples para GIF, áudio e conversões rápidas

Arquivos de vídeo são úteis, mas nem sempre o formato mais fácil de compartilhar. Um clipe curto pode funcionar melhor como GIF animado, enquanto uma gravação pode ser mais útil como MP3. As [ferramentas de vídeo online grátis](/tools/video-tools) do NanoImage oferecem conversões simples e focadas sem software de edição complexo.

Use [Conversor de vídeo para GIF](/video-to-gif) para reações, tutoriais, prévias de produto, posts sociais e explicações visuais rápidas. GIFs repetem automaticamente e costumam ser mais fáceis de incorporar que arquivos de vídeo.

Use [Conversor de vídeo para MP3](/video-to-mp3) para extrair áudio de notas de voz, aulas, entrevistas, gravações de tela e clipes de referência.

Esta categoria é um utilitário leve — envie ou selecione um vídeo, escolha a saída, processe e baixe. As ferramentas de vídeo se conectam ao resto do NanoImage: converter para GIF e depois [comprimir](/compress-image) ou [recortar](/crop-image); extrair MP3 para podcasts ou anotações.

GIFs funcionam melhor com clipes curtos e movimento simples. A extração MP3 é ideal quando você só precisa do som. Se o processamento for no navegador para arquivos suportados, os arquivos permanecem no dispositivo — consulte o aviso de privacidade de cada ferramenta.`,
    scenarios: [
      { question: 'Precisa de clipe em loop para chat ou redes?', toolSlug: 'video-to-gif' },
      { question: 'Precisa só do áudio do vídeo?', toolSlug: 'video-to-mp3' },
      { question: 'GIF grande demais após converter?', toolSlug: 'compress-image' },
      { question: 'Precisa de texto meme em um frame?', toolSlug: 'meme-generator' },
    ],
    faqs: [
      { q: 'Quanto tempo deve ter o vídeo para GIF?', a: 'Clipes curtos (alguns segundos a ~15 s) funcionam melhor. Clipes mais longos produzem GIFs muito grandes.' },
      { q: 'Vídeo para MP3 — mantém o vídeo?', a: 'Não. A exportação MP3 é só áudio. Guarde o vídeo original se precisar dos dois.' },
      { q: 'As ferramentas de vídeo são gratuitas?', a: 'Sim. As ferramentas principais de conversão são gratuitas, sem cadastro.' },
      { q: 'Quais formatos são suportados?', a: 'Formatos comuns suportados pelo navegador como MP4 e WebM. Veja cada página de ferramenta.' },
      { q: 'Posso editar o GIF após converter?', a: 'Sim. Use ferramentas de imagem como recortar, redimensionar, comprimir ou adicionar texto em frames exportados ou fluxos relacionados.' },
    ],
    howItWorks: [
      'Abra Vídeo para GIF ou Vídeo para MP3 e envie seu clipe.',
      'Ajuste qualidade, tempo ou áudio conforme necessário.',
      'Baixe o GIF ou MP3. Use ferramentas de imagem para otimizar mais.',
    ],
  },
}
