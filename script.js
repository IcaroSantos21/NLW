const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');
const markdownToHtml = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
}
 
const perguntarAI = async (question, game, apiKey) => {
  const model = 'gemini-2.5-flash';
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const perguntaLol = `
  ## Especialidade:
  Você é um especialista assistente de meta para o jogo ${game}
   ## Tarefa:
  Você deve responder a pergunta do usuário sobre o jogo com base no seu conhecimento, estratégias, builds e dicas.
   ## Regras:
   - Se você não sabe a resposta, responda com 'Não sei'. Não tente inventar uma resposta.
   Se a pergunta não está relacionada ao jogo, responda com 'Esta pergunta não está relacionada ao jogo'.
   - Considere a data atual ${new Date().toLocaleDateString('pt-BR')}
   - Faça pesquisas atualizadas sobre a ultima versão do jogo, baseado na data atual.
   - Nunca responda itens que vocÊ tenha certeza que está no patch atual do jogo.
   ## Resposta:
   - Economize na resposta, seja direto e responda no maximo 500 caracteres. 
   - Responda em markdown.
   - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário.
   ## Exemplo de resposta:
   Pergunta: Qual é a melhor build para o personagem X no jogo Y?
   Resposta: A melhor build atual para o personagem X: é \n\n **Itens**\n\n Coloque os itens aqui\n\n**Runas**\n\nexemplo de runas\n\n.

   ---
   Aqui está a pergunta do usuário: ${question}
    `;
  const perguntaValorant = ` 
  ## Especialidade:
  Voce é um especialista assistente de meta para o jogo Valorant\n 
  ## Tarefa: Você deve responder a pergunta do usuário sobre o jogo com base no seu conhecimento, estratégias, builds e dicas. 
  ## Regras: - Se você não sabe a resposta, responda com 'Não sei'. Não tente inventar uma resposta. Se a pergunta não está relacionada ao jogo, responda com 'Esta pergunta não está relacionada ao jogo'. - Considere a data atual ${new Date().toLocaleDateString('pt-BR')} - Faça pesquisas atualizadas sobre a ultima versão do jogo, baseado na data atual. - Nunca responda itens que vocÊ tenha certeza que está no patch atual do jogo. 
  ## Resposta: - Economize na resposta, seja direto e responda no maximo 500 caracteres. 
  - Responda em markdown. 
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário. 
  ## Exemplo de Resposta: 
  Pergunta: Qual é a melhor agente para jogar no Valorant? 
  Resposta: A melhor agente para jogar no Valorant atualmente é a Jett, pois ela tem uma alta mobilidade e pode ser muito eficaz em partidas competitivas. Ela é ótima para jogadores que gostam de jogar de forma agressiva e rápida. Além disso, sua habilidade de ultimate permite que ela se reposicione rapidamente e cause dano significativo aos inimigos.

  ---

   Aqui está a pergunta do usuário: ${question}

  `;
  const perguntaCsgo = `
  ## Especialidade:
   Você é um especialista assistente de meta para o jogo Counter-Strike: Global Offensive (CS:GO)\n
  ## Tarefa: Você deve responder a pergunta do usuário sobre o jogo com base no seu conhecimento, estratégias, granadas e dicas.\n
  ## Regras: - Se você não sabe a resposta, responda com 'Não sei'. Não tente inventar uma resposta. Se a pergunta não está relacionada ao jogo, responda com 'Esta pergunta não está relacionada ao jogo'. - Considere a data atual ${new Date().toLocaleDateString('pt-BR')} - Faça pesquisas atualizadas sobre a ultima versão do jogo, baseado na data atual. - Nunca responda itens que vocÊ tenha certeza que está no patch atual do jogo.\n
  ## Resposta:
  - Economize na resposta, seja direto e responda no maximo 500 caracteres.\n
  - Responda em markdown.\n - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário.\n 
  ## Exemplo de Resposta:\n 
  Pergunta: Qual é a melhor arma para jogar no CS:GO?\n 
  Resposta: A melhor arma para jogar no CS:GO atualmente é a AK-47, pois ela é uma arma de fogo com alta precisão e dano. Ela é ótima para jogadores que gostam de jogar de forma agressiva e rápida. Além disso, sua habilidade de ultimate permite que ela se reposicione rapidamente e cause dano significativo aos inimigos.\n
  
  ---

  Aqui está a pergunta do usuário: ${question}
    `;

  const perguntaFreeFire = `
  ## Especialidade:
  Você é um especialista assistente de meta para o jogo Free Fire\n
  ## Tarefa: Você deve responder a pergunta do usuário sobre o jogo com base no seu conhecimento, estratégias e dicas.\n
  ## Regras: - Se você não sabe a resposta, responda com 'Não sei'. Não tente inventar uma resposta. Se a pergunta não está relacionada ao jogo, responda com 'Esta pergunta não está relacionada ao jogo'. - Considere a data atual ${new Date().toLocaleDateString('pt-BR')} - Faça pesquisas atualizadas sobre a ultima versão do jogo, baseado na data atual. - Nunca responda itens que vocÊ tenha certeza que está no patch atual do jogo.\n
  ## Resposta:
  - Economize na resposta, seja direto e responda no maximo 500 caracteres.\n
  - Responda em markdown.\n
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário.\n
  ## Exemplo de Resposta:\n
  Pergunta: Qual é a melhor arma para jogar no Free Fire?\n
  Resposta: A melhor arma para jogar no Free Fire atualmente é a AK-47, pois ela é uma arma de fogo com alta precisão e dano. Ela é ótima para jogadores que gostam de jogar de forma agressiva e rápida. Além disso, sua habilidade de ultimate permite que ela se reposicione rapidamente e cause dano significativo aos inimigos.\n
  ---
  Aqui está a pergunta do usuário: ${question}
    `;

  let pergunta = '';
  if (game == 'lol') {
    pergunta = perguntaLol;}
    else if (game == 'Valorant') {
      pergunta = perguntaValorant;
    }
    else if (game == 'csgo') {
      pergunta = perguntaCsgo;
    }
    else if (game == 'freefire') {
      pergunta = perguntaFreeFire;
    }
  const contents = [{
    role: 'user',
    parts: [{
      text: pergunta
    }]
  }]

  const tools = [{
    google_search: {} 
  }]

  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents
    })
  })
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async(event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value
  const game = gameSelect.value
  const question = questionInput.value

  if (apiKey == '' || game == '' || question == '') {
    alert('Por favor, preencha todos os campos.')
    return;
  }
  askButton.disabled = true;
  askButton.textContent = 'Carregando...';
  askButton.classList.add('loading');

  try {
    const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHtml(text);
    aiResponse.classList.remove('hidden');
  } catch(error)
  {
    console.log('Error', error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = 'Enviar';
    askButton.classList.remove('loading');
  }
}


form.addEventListener('submit', enviarFormulario);