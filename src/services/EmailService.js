const nodemailer = require('nodemailer');
// ✨ Importações necessárias para buscar dados reais do banco MySQL
const { Inscricao, Evento, Participante, Notificacao } = require('../models');
const lembreteEvento = require('../templates/email/lembreteEventos'); // 👈 CORRIGIDO: Subindo uma pasta com ../
const { Op } = require('sequelize');

const SMTP_HOST = process.env.SMTP_HOST || 'MAILPIT_IP';
const SMTP_PORT = process.env.SMTP_PORT || 1025;
const MAILPIT_URL = `http://${SMTP_HOST}:8025`;

let transporter = null;

async function inicializar() {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  console.log('═══════════════════════════════════════════');
  console.log('📧 E-mail de teste configurado para MailPit!');
  console.log('═══════════════════════════════════════════');


  try {
    await transporter.verify();
    console.log('📧 Servidor de e-mail conectado!');
    console.log(`   SMTP: ${SMTP_HOST}:${SMTP_PORT}`);
    console.log(`   Painel: ${MAILPIT_URL}`);
    console.log('═══════════════════════════════════════════');
  } catch (erro) {
    console.error('⚠️ Servidor de e-mail indisponível:', erro.message);
    console.error('   Verifique se o MailPit está rodando e o IP está correto.');
  }
}

async function enviar(para, assunto, html) {
  if (!transporter) {
    throw new Error('EmailService não inicializado. Chame inicializar() primeiro.');
  }

  const info = await transporter.sendMail({
    from: '"Plataforma de Eventos" <eventos@notificacoes.com>',
    to: para,
    subject: assunto,
    html: html,
  });

  console.log(`📧 E-mail enviado para ${para} (ID: ${info.messageId})`);
  console.log(`   Visualizar em: ${MAILPIT_URL}`);

  return {
    messageId: info.messageId,
    visualizarEm: MAILPIT_URL,
  };
}

// ✨ FUNÇÃO REAL: Executa a regra de negócio varrendo o banco de dados
async function enviarLembretesDiarios() {
  try {
    console.log("⏰ [LEMBRETE] Iniciando busca alargada por eventos futuros...");

    // Cria uma data retroativa (ontem) para garantir que pegue eventos de hoje sem problemas de fuso horário
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    // 1. Busca no MySQL todas as inscrições cujos eventos acontecem a partir de ontem
    const inscricoes = await Inscricao.findAll({
      include: [
        {
          model: Evento,
          as: 'evento',
          where: {
            data: {
              [Op.gte]: ontem // 👈 [GTE = Greater Than or Equal] Significa: qualquer data maior ou igual a ontem
            }
          }
        },
        { model: Participante, as: 'participante' }
      ]
    });

    console.log(`[LEMBRETE] Foram encontradas ${inscricoes.length} inscrições para processar no banco.`);

    if (inscricoes.length === 0) {
      console.log("⚠️ [LEMBRETE] Nenhuma inscrição encontrada com evento futuro no banco.");
      return { processados: 0 };
    }

    // 2. Itera sobre os registros encontrados
    for (const inscricao of inscricoes) {
      const { evento, participante } = inscricao;

      const dadosTemplate = {
        participanteNome: participante.nome,
        eventoNome: evento.nome,
        eventoData: evento.data,
        eventoLocal: evento.local
      };

      // 3. O seu template executa e calcula a variável diasFaltando de verdade aqui
      const htmlGerado = lembreteEvento(dadosTemplate);

      // 4. Envia o e-mail real para a caixa do participante
      await enviar(
        participante.email,
        `⏰ Lembrete Real: O evento "${evento.nome}" está chegando!`,
        htmlGerado
      );

      // 5. Registra o envio para controle histórico
      await Notificacao.create({
        inscricao_id: inscricao.id,
        tipo: 'lembrete',
        destinatarioEmail: participante.email,
        assunto: `Lembrete: O evento ${evento.nome} está chegando!`,
        conteudo: htmlGerado,
        enviada: true
      });
    }

    console.log("✅ [LEMBRETE] Disparos reais concluídos.");
    return { processados: inscricoes.length };

  } catch (erro) {
    console.error("❌ [LEMBRETE] Erro ao processar varredura:", erro.message);
    throw erro;
  }
}


module.exports = {
  inicializar,
  enviar,
  enviarLembretesDiarios,
};
