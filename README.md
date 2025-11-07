# Consultório Jurídico - Site de Agendamento

Site completo para consultório jurídico com sistema de agendamento de consultas online.

## 📋 Estrutura do Projeto

### Páginas Implementadas

1. **Homepage (index.html)**
   - Texto impactante com CTA principal
   - Seção de benefícios (confidencialidade, atendimento rápido, profissional especializado)
   - Testimonials de clientes
   - FAQ com dúvidas frequentes
   - Design moderno e responsivo

2. **Serviços (servicos.html)**
   - Listagem completa de 8 áreas de atuação:
     - Direito de Família
     - Direito Trabalhista
     - Direito Civil
     - Direito Tributário
     - Direito Empresarial
     - Direito Criminal
     - Direito Previdenciário
     - Direito Imobiliário
   - Para cada área: descrição, valor, duração e experiência
   - Link direto para agendamento

3. **Agendamento (agendamento.html)** - Sistema completo com 8 etapas:
   - Etapa 1: Seleção da área de direito
   - Etapa 2: Seleção do advogado
   - Etapa 3: Tipo de consulta (presencial, online, telefone)
   - Etapa 4: Calendário com horários disponíveis (próximos 30 dias)
   - Etapa 5: Formulário com dados do cliente (nome, CPF, e-mail, telefone, descritivo)
   - Etapa 6: Confirmação de privacidade/LGPD
   - Etapa 7: Escolha de forma de pagamento
   - Etapa 8: Confirmação final com número de protocolo

4. **Sobre (sobre.html)**
   - Informações dos advogados
   - Foto profissional, formação, especialidades
   - OAB verificada com link
   - Histórico de atuação
   - Prêmios e reconhecimentos

5. **Política de Privacidade (privacidade.html)**
   - Conformidade com LGPD
   - Informações sobre criptografia de dados
   - Política de cancelamento/reagendamento (24h)
   - Termos de serviço jurídico
   - Direitos do titular dos dados

6. **Área do Cliente (area-cliente.html)**
   - Histórico de consultas agendadas/realizadas
   - Documentos de contrato/proposta para download
   - Opção de cancelar/remarcar com justificativa
   - Chat/formulário para dúvidas pós-consulta
   - Sistema de login simulado

7. **Contato (contato.html)**
   - Endereço do escritório
   - Telefone, e-mail, WhatsApp
   - Horário de funcionamento
   - Redes sociais profissionais
   - Formulário de contato
   - Mapa (placeholder para Google Maps)

8. **Blog (blog.html)**
   - Publicações sobre temas de direito
   - Dicas de proteção legal
   - Direitos do consumidor
   - Mudanças na legislação
   - SEO-friendly para tráfego orgânico

9. **Termos de Serviço (termos.html)**
   - Condições de uso dos serviços
   - Políticas de cancelamento
   - Limitação de responsabilidade

## 🎨 Características

- **Design Moderno**: Interface limpa e profissional
- **Totalmente Responsivo**: Funciona em desktop, tablet e mobile
- **Navegação Intuitiva**: Menu hambúrguer para mobile
- **Sistema de Agendamento Completo**: Wizard de 8 etapas com validação
- **Conformidade LGPD**: Política de privacidade completa
- **Área do Cliente**: Sistema de login e gerenciamento de consultas

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS)
- JavaScript (Vanilla)
- Font Awesome (ícones)
- Design responsivo com CSS Grid e Flexbox

## 📁 Estrutura de Arquivos

```
Adv/
├── index.html              # Homepage
├── servicos.html           # Página de serviços
├── agendamento.html        # Sistema de agendamento
├── sobre.html              # Sobre os advogados
├── privacidade.html        # Política de privacidade
├── area-cliente.html       # Área do cliente
├── contato.html            # Contato e localização
├── blog.html               # Blog jurídico
├── termos.html             # Termos de serviço
├── css/
│   ├── style.css           # Estilos principais
│   └── agendamento.css     # Estilos do agendamento
├── js/
│   ├── main.js             # JavaScript principal
│   └── agendamento.js      # JavaScript do agendamento
└── README.md               # Este arquivo
```

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Navegue pelas páginas através do menu
3. Teste o sistema de agendamento completo
4. Acesse a área do cliente (login simulado)

## 📝 Funcionalidades do Agendamento

- Seleção de área de direito com preços
- Escolha de advogado
- Tipo de consulta (presencial, online, telefone)
- Calendário com horários disponíveis
- Formulário completo de dados
- Validação de campos
- Máscaras para CPF e telefone
- Confirmação LGPD
- Geração de protocolo único

## 🔒 Segurança e Privacidade

- Conformidade com LGPD
- Política de privacidade detalhada
- Informações sobre criptografia
- Consentimento explícito para tratamento de dados

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Próximos Passos (Opcional)

Para tornar o site totalmente funcional, seria necessário:
- Backend para processar agendamentos
- Banco de dados para armazenar consultas
- Sistema de autenticação real
- Integração com Google Maps
- Sistema de pagamento online
- Envio de e-mails de confirmação
- Painel administrativo

## 📄 Licença

Este projeto foi criado para fins educacionais e de demonstração.

---

**Desenvolvido com foco em usabilidade, segurança e conformidade legal.**

