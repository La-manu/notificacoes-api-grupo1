![][image1]

    

**Matriz Técnica × Camada**  
**do Módulo de Notificações**

**| UC:** Testes de Software (TSOF)   
**| Data**: 20/08/2026   
**| Modalidade:** em grupo  
**| Tempo:** 45 minutos   
**| Avaliação:** formativa (CT 1 | CS 1, 2\)

**PARTICIPANTES:**

[Amanda Silva Bellizotti](mailto:amanda.bellizotti@aluno.senai.br) N°03  
[Ana Julia do Nascimento Thimote](mailto:ana.thimote@aluno.senai.br) N°04  
				[Beatriz Tacahashi Korekane](mailto:beatriz.korekane@aluno.senai.br) N°07  
[Layra Emanuelle Gomes Scarmanha](mailto:layraemanuelleg@gmail.com) N°15

**AGOSTO / 2026**  
**Parte 1 — Matriz técnica × camada**   
Para cada camada do módulo, indique a prioridade de cada técnica: Alta, Média, Baixa ou Fora do escopo. Toda célula precisa de justificativa — nem que seja uma linha.

| Camada / grupo de rotas  | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Autenticação ( /auth/\* ) | ALTA | ALTA | MÉDIA | MÉDIA | BAIXO | FORA DO ESCOPO |
| Notificações | ALTA | ALTA | MÉDIA | BAIXA | FORA DO ESCOPO | FORA DO ESCOPO |
| Eventos | ALTA | ALTA | MÉDIA | ALTA | MÉDIA | MÉDIA |
| Participantes / inscrições | ALTA | ALTA | MÉDIA | ALTA | MÉDIA | ALTA |
| Envio de e-mail (Nodemailer/MailPit) | BAIXA | BAIXA | ALTA | FORA DO ESCOPO | FORA DO ESCOPO | FORA DO ESCOPO |
| Camada de dados (models \+ MySQL) | ALTA | MÉDIA | ALTA | ALTA | MÉDIA | MÉDIA |

**JUSTIFICA**   
**1\. Autenticação**

* **Segurança (Alta):** É a porta de entrada. Se falhar, qualquer um rouba senha e entra no sistema.  
* **Regressão (Alta):** Se o login quebrar, ninguém mais consegue usar o resto do sistema.  
* **Paralelo (Fora do escopo):** Cada um faz seu login sozinho, não tem disputa de vaga ou recurso aqui.

**2\. Notificações**

* **Estresse (Fora do escopo):** É só aviso interno, não precisa forçar a barra testando milhares de vezes.  
* **Paralelo (Fora do escopo):** O aviso vai individualmente para cada um, não tem como dar conflito.

**3\. Eventos**

* **Regressão (Alta):** É o principal do sistema. Se der pau no cadastro ou na busca de eventos, o projeto para.  
* **Segurança (Alta):** Tem rota de criar, deletar e subir imagem (banner). Precisa checar bem o token e o arquivo para evitar invasão.  
* **Performance (Alta):** Baixar relatórios e JSON de vários eventos juntos pode deixar a API bem lenta.

**4\. Participantes / inscrições**

* **Regressão (Alta):** Não dá para arriscar quebrar o fluxo de se inscrever e cancelar.  
* **Segurança (Alta):** Precisa ter token para um usuário não cancelar a inscrição do outro.  
* **Performance (Alta):** Puxar a lista de todo mundo inscrito exige bastante do sistema.  
* **Paralelo (Alta):** Se duas pessoas clicarem no mesmo segundo na última vaga, o sistema não pode dar a mesma vaga para as duas.

**5\. Envio de e-mail (Nodemailer/MailPit)**

* **Recuperação (Alta):** Se o envio de e-mail cair, a aplicação tem que continuar rodando sem travar tudo.  
* **Performance / Estresse / Paralelo (Fora do escopo):** A gente usa o MailPit só para simular o e-mail nos testes locais, então não faz sentido medir velocidade real ou tentar derrubar esse serviço.

**6\. Camada de dados (models \+ MySQL)**

* **Regressão (Alta):** Mudar o código não pode quebrar as tabelas do banco nem apagar dados salvos.  
* **Recuperação (Alta):** Se o banco de dados cair ou der queda de luz, ele tem que voltar sem perder as informações.  
* **Performance (Alta):** Buscar dados cruzados (como eventos \+ inscritos) precisa ser rápido, se não a tela do usuário trava.  
* 

---

**Parte 2 — Escopo: o que fica dentro e o que fica fora**

**2.1** Listem as técnicas que ficam dentro do escopo desta UC, com a ferramenta que vocês pretendem  
usar em cada uma:

| Técnica | Ferramenta prevista | Em que nível será aplicada |
| :---- | :---- | :---- |
| Regressão | Jest / Supertest | Testes de Integração nas rotas de Autenticação, Eventos e Inscrições.  |
| Segurança  | OWASP ZAP / Postman | Rotas da API (validação de Token JWT e upload de arquivos no Banner).  |
| Recuperação | Docker | Simulação de queda do banco MySQL e do serviço de e-mail.  |
| Performance  | K6 / Apache JMeter | Rotas de listagem e exportação de relatórios (JSON do MySQL).  |
| Paralelo | K6  | Requisições simultâneas na rota `POST /inscricoes` (disputa de vagas).  |

**2.2** Listem as técnicas que ficam fora do escopo. Para cada uma, classifiquem o motivo — e a  
distinção importa:

| Técnica descartada | Motivo | Tipo de motivo |
| :---- | :---- | :---- |
| Estresse  | Não há ambiente/servidor de produção configurado para testes de carga extrema no projeto.  | Falta de requisito e  Falta de tempo  |

---

# **Parte 3- Verificações de segurança** 

Segurança é a técnica de melhor custo-benefício do módulo de vocês: os testes são curtos e rodam em segundos.

Definam três verificações de segurança concretas para o módulo. Para cada uma:

| \# | O que verificar | Nível | Resultado esperado |
| :---- | :---- | :---- | :---- |
| 1 | Tentativa de disparar notificação com ID inválido ou sem token no cabeçalho  | Middleware (`errorHandler.js`)  | A requisição é interceptada antes do controller e retorna erro `401 Unauthorized` ou `400 Bad Request`.   |
| 2 | Envio de e-mail usando template não cadastrado ou com parâmetros maliciosos  | Service (`NotificacaoService.js`)  | A regra de negócio falha de forma segura, impede a chamada ao `EmailService.js` e lança uma exceção `AppError`.  |
| 3 | Persistência do e-mail/dados do participante na tabela de logs (`NotificacaoModel.js`)  | Banco de Dados (`migrations`)  | O campo de e-mail/dados sensíveis é salvo de forma **criptografada ou anonimizada** no banco de dados.  |

 

---

**Parte 4 — Regressão no calendário**

**Regressão só funciona se tiver momento definido para acontecer.** 

**Respondam:**  
**4.1 Em que momentos o grupo vai rodar a suíte completa? (Ex.: antes de cada commit? no fim de cada aula? antes de cada entrega?)**   
O grupo vai rodar a suíte completa em dois momentos principais: localmente antes de cada push para o repositório e ao final de cada aula para garantir que as alterações do dia não quebraram nenhuma funcionalidade existente. 

**4.2 Quem no grupo é responsável por verificar que a suíte está passando antes de uma entrega?**  
Layra

**4.3 O que o grupo faz se, na véspera de uma entrega, a suíte acusar falha em um teste que antes passava? Escrevam a regra agora, com calma — não na hora do desespero.**  
O grupo irá identificar o último commit funcional através do histórico de versão do Git para isolar a alteração que causou a regressão. Uma vez identificada a origem da falha, a prioridade máxima da equipe passa a ser o ajuste imediato do bug ou, caso o reparo exija um tempo superior à janela da entrega, o *revert* pontual da funcionalidade instável para assegurar que a versão submetida esteja completamente estável e com todos os testes passando. 

---

**Ticket Individual**

**Aluna: Beatriz**   
**1\. Qual a diferença entre teste de performance e teste de estresse?**  
**R: O teste de performance mede a velocidade, a estabilidade e o uso de recursos dentro de um sistema.**   
**Já o teste de estresse força o mesmo para descobrir onde há falhas e erros capazes de danificar um sistema**

**2\. Regressão é um nível de teste ou uma técnica? Justifique em uma frase.**  
**R:** Regressão é uma **técnica** de teste (que pode ser aplicada em qualquer nível de teste), pois consiste em reexecutar testes já realizados para garantir que alterações no sistema não causaram novos defeitos. 

**3\. Cite uma técnica que o seu grupo descartou e a razão técnica do descarte.**  
**R: Descartamos a técnica estresse, porque não há ambiente/servidor de produção configurado para testes de carga extrema no projeto.**   
**Também não há tempo e requisitos.**

**Aluna: Layra**  
**1\. Qual a diferença entre teste de performance e teste de estresse?**

**R: Teste de Performance (ou Desempenho): Avalia a velocidade, o tempo de resposta, a estabilidade e a eficiência do sistema sob uma carga de uso esperada ou normal. O objetivo é verificar se a aplicação atende aos requisitos de desempenho do dia a dia.**  
**Teste de Estresse: Submete o sistema a uma carga extrema, muito acima do limite normal do sistema, até que ele quebre. O objetivo é descobrir o ponto de ruptura, identificar falhas de segurança/estabilidade e avaliar como o sistema se recupera após uma queda.**

**2\. Regressão é um nível de teste ou uma técnica? Justifique em uma frase.**

**R: O teste de regressão é um tipo de teste (e não um nível ou uma técnica), pois tem o objetivo específico de verificar se alterações recentes causaram defeitos em funcionalidades já existentes, podendo ser executado em qualquer nível de teste (como unidade, integração ou sistema).**   
**3\. Cite uma técnica que o seu grupo descartou e a razão técnica do descarte.**

**3\. Cite uma técnica que o seu grupo descartou e a razão técnica do descarte.**

**R: Técnica descartada: Tabela de Decisão (*Decision Table Testing*).**  
**Razão técnica do descarte: A aplicação possuía poucas combinações condicionais de variáveis. A montagem da tabela geraria uma alta complexidade de documentação e manutenção para pouca cobertura prática, sendo substituída pelo Particionamento por Classes de Equivalência, que validou os cenários de entrada com maior eficiência e menor custo computacional.**

**Ticket de saída — individual**

**Aluna Amanda**

**1\. Qual a diferença entre teste de performance e teste de estresse?**  
**R: O teste de performance mede o tempo de resposta e a eficiência do sistema operando sob uma carga de acesso normal e esperada, garantindo que a aplicação rode de forma rápida e estável no dia a dia. Já o teste de estresse empurra o sistema além de todos os seus limites operacionais, aplicando uma carga extrema até forçar uma falha para descobrir o ponto exato de quebra da aplicação e avaliar como ela se recupera após um colapso.**

**2\. Regressão é um nível de teste ou uma técnica? Justifique em uma frase.**  
**Regressão é uma estratégia ou tipo de teste (não um nível), pois consiste em reexecutar testes existentes em qualquer nível — unitário, de integração ou de sistema — para garantir que alterações no código não quebraram funcionalidades que já funcionavam.**

**3\. Cite uma técnica que o seu grupo descartou e a razão técnica do descarte.**

**O grupo descartou a técnica de testes em paralelo devido à concorrência de acessos ao banco de dados, que gerava inconsistências nos estados das tabelas de notificações e eventos quando executados simultaneamente por threads distintas.**

***Ticket de saída — individual***  
Ana Julia Thimote Nº  04 Grupo \- 01 

**Atividade 02 — Matriz Técnica × Camada do Módulo de Notificações**

* 1\. Qual a diferença entre teste de performance e teste de estresse?

	  
**R:** Performance é pra ver se o sistema aguenta o tranco do dia a dia rodando liso e rápido. Estresse é pra socar carga até o sistema quebrar, só pra descobrir o limite dele e ver como ele reage no caos. 

* 2\. Regressão é um nível de teste ou uma técnica? Justifique em uma frase.

**R:** Regressão é um tipo de teste: a gente roda pra ter certeza de que nenhuma alteração ou código novo quebrou o que já estava funcionando. 

* 3\. Cite uma técnica que o seu grupo descartou e a razão técnica do descarte.

**R:** Descartamos o teste em paralelo no Envio de e-mail porque disparar requisições simultâneas pra serviços de e-mail não reflete o uso real e só geraria falso-positivo ou sobrecarga inútil no ambiente de testes.

[image1]: <data:image/png;base64,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>