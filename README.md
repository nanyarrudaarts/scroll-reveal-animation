# Scroll Reveal Animation

Crie uma animação controlada EXCLUSIVAMENTE pelo scroll do usuário usando a sequência de frames do Art Mail Club.

A lógica deve ser baseada no progresso do scroll dentro da seção, como uma animação frame-by-frame.

SEQUÊNCIA DA ANIMAÇÃO

A animação possui 14 frames, nesta ordem:

FRAME 001 → FRAME 002 → FRAME 003 → FRAME 004 → FRAME 005 → FRAME 006 

O comportamento deve ser:

FRAME 001 → FRAME 002

No início da seção, mostrar o FRAME 001.

Conforme o usuário começa a fazer scroll, avançar gradualmente do FRAME 001 para o FRAME 002.

FRAME 002 → FRAME 003

Continuando o scroll, avançar gradualmente do FRAME 002 para o FRAME 003.

FRAME 003 → FRAME 004

Continuando o scroll, avançar gradualmente do FRAME 003 para o FRAME 004.

FRAME 004 → FRAME 005

Continuando o scroll, avançar gradualmente do FRAME 004 para o FRAME 005.

FRAME 005 → FRAME 006

Continuando o scroll, avançar gradualmente do FRAME 005 para o FRAME 006.

COMPORTAMENTO DA SEÇÃO

A imagem deve permanecer visualmente centralizada e fixa na viewport enquanto a animação acontece.

Use uma seção com position: sticky para criar esse efeito.

O usuário deve sentir que está "abrindo" o envelope através do próprio scroll.

IMPORTANTE:

NÃO reproduzir a sequência automaticamente.

NÃO usar autoplay.

NÃO usar um vídeo.

NÃO fazer loop.

O scroll é o controle da animação.

O progresso vertical do scroll deve controlar o frame exibido.

Os frames devem ser pré-carregados para evitar flickering.

A animação deve ser suave e responsiva.

FINAL DA ANIMAÇÃO

Quando o usuário chegar ao FRAME 06:

mostrar o FRAME 6;

manter o FRAME 6 completamente estático;

não avançar para nenhum outro frame;

não reiniciar;

não fazer loop.

O FRAME 06 deve permanecer visível enquanto o usuário termina de atravessar a área sticky.

Depois que a área da animação terminar, o usuário continua normalmente para a próxima seção do site.

SCROLL REVERSO

Se o usuário voltar o scroll para cima:

a animação deve funcionar ao contrário;

FRAME 06 → FRAME 05 → FRAME 012 → ... → FRAME 001.

Ou seja, o frame exibido deve sempre corresponder diretamente à posição do scroll.

IMPORTANTE SOBRE A DISTÂNCIA DO SCROLL

Não faça cada frame mudar instantaneamente a cada pequeno movimento.

Crie espaço vertical suficiente para que exista uma transição perceptível entre:

FRAME 001 → FRAME 006.

O usuário deve ter a sensação de que está controlando manualmente a abertura do envelope.

A animação inteira deve acontecer durante aproximadamente 400–500vh de scroll da seção.

Não altere, redesenhe, recorte ou estilize os frames originais. Use exatamente as imagens fornecidas.

O objetivo é:

SCROLL ↓
FRAME 001
↓
FRAME 002
↓
FRAME 003
↓
...
Ultimo Frame .FICA PARADO

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0de3ef92-e7fc-49f5-87bd-69a527cbcd8c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
