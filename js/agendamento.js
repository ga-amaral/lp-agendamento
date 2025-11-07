// Configuração inicial
let currentStep = 1;
const totalSteps = 8;
const areas = {
    familia: { name: 'Direito de Família', price: 'R$ 300,00' },
    trabalhista: { name: 'Direito Trabalhista', price: 'R$ 250,00' },
    civil: { name: 'Direito Civil', price: 'R$ 280,00' },
    tributario: { name: 'Direito Tributário', price: 'R$ 400,00' },
    empresarial: { name: 'Direito Empresarial', price: 'R$ 450,00' },
    criminal: { name: 'Direito Criminal', price: 'R$ 350,00' },
    previdenciario: { name: 'Direito Previdenciário', price: 'R$ 300,00' },
    imobiliario: { name: 'Direito Imobiliário', price: 'R$ 320,00' }
};

const lawyers = {
    'dr-silva': { name: 'Dr. João Silva', oab: 'OAB/SP 12a.456' },
    'dra-santos': { name: 'Dra. Maria Santos', oab: 'OAB/SP 23b.567' },
    'dr-costa': { name: 'Dr. Pedro Costa', oab: 'OAB/SP 34c.678' }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configurar data mínima (hoje)
    const dateInput = document.getElementById('consultationDate');
    if (dateInput) {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);
        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = maxDate.toISOString().split('T')[0];
        dateInput.addEventListener('change', loadTimeSlots);
    }

    // Máscaras de input
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = formatCPF(e.target.value);
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            e.target.value = formatPhone(e.target.value);
        });
    }

    // Verificar parâmetro da URL para pré-selecionar área
    const urlParams = new URLSearchParams(window.location.search);
    const areaParam = urlParams.get('area');
    if (areaParam && document.querySelector(`input[name="area"][value="${areaParam}"]`)) {
        document.querySelector(`input[name="area"][value="${areaParam}"]`).checked = true;
    }

    // Carregar horários iniciais
    loadTimeSlots();
});

// Função para avançar etapa
function nextStep() {
    const currentFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredInputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    // Validação especial para checkbox LGPD
    if (currentStep === 6) {
        const lgpdCheckbox = document.getElementById('lgpdConsent');
        if (!lgpdCheckbox.checked) {
            alert('Você precisa concordar com a Política de Privacidade para continuar.');
            isValid = false;
        }
    }

    // Validar campos obrigatórios
    requiredInputs.forEach(input => {
        if (input.type === 'radio') {
            const radioGroup = currentFormStep.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
            }
        } else if (!input.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (currentStep < totalSteps) {
        // Marcar etapa atual como completa
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

        // Avançar para próxima etapa
        currentStep++;
        showStep(currentStep);

        // Se for a última etapa, gerar confirmação
        if (currentStep === 8) {
            generateConfirmation();
        }
    }
}

// Função para voltar etapa
function prevStep() {
    if (currentStep > 1) {
        // Remover status de completa da etapa atual
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

        // Voltar para etapa anterior
        currentStep--;
        showStep(currentStep);
    }
}

// Função para mostrar etapa específica
function showStep(step) {
    // Esconder todas as etapas
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });

    // Mostrar etapa atual
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentFormStep) {
        currentFormStep.classList.add('active');
    }

    // Atualizar progress bar
    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 < step) {
            stepEl.classList.add('completed');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
        }
    });

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para carregar horários disponíveis
function loadTimeSlots() {
    const dateInput = document.getElementById('consultationDate');
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    if (!dateInput || !timeSlotsContainer) return;

    const selectedDate = dateInput.value;
    if (!selectedDate) {
        timeSlotsContainer.innerHTML = '<p style="color: var(--text-light);">Selecione uma data primeiro</p>';
        return;
    }

    // Horários disponíveis (exemplo: 8h às 18h, de hora em hora)
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;
        // Simular alguns horários já ocupados
        const isAvailable = Math.random() > 0.3; // 70% de chance de estar disponível
        timeSlots.push({ time: timeString, available: isAvailable });
    }

    timeSlotsContainer.innerHTML = '';
    timeSlots.forEach(slot => {
        const slotElement = document.createElement('div');
        slotElement.className = `time-slot ${slot.available ? '' : 'disabled'}`;
        slotElement.textContent = slot.time;
        if (slot.available) {
            slotElement.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                // Salvar horário selecionado
                document.querySelector('input[name="consultationTime"]')?.remove();
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'consultationTime';
                hiddenInput.value = slot.time;
                document.getElementById('bookingForm').appendChild(hiddenInput);
            });
        }
        timeSlotsContainer.appendChild(slotElement);
    });
}

// Função para gerar confirmação
function generateConfirmation() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    const area = formData.get('area');
    const lawyer = formData.get('lawyer');
    const consultationType = formData.get('consultationType');
    const date = formData.get('consultationDate');
    const time = formData.get('consultationTime');
    const clientName = formData.get('clientName');
    const cpf = formData.get('cpf');
    const email = formData.get('email');
    const phone = formData.get('phone');

    const confirmationDetails = document.getElementById('confirmationDetails');
    confirmationDetails.innerHTML = `
        <div class="detail-item">
            <span class="detail-label">Área de Direito:</span>
            <span class="detail-value">${areas[area]?.name || area}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Advogado:</span>
            <span class="detail-value">${lawyers[lawyer]?.name || lawyer}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Tipo de Consulta:</span>
            <span class="detail-value">${getConsultationTypeLabel(consultationType)}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Data:</span>
            <span class="detail-value">${formatDate(date)}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Horário:</span>
            <span class="detail-value">${time || 'Não selecionado'}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Cliente:</span>
            <span class="detail-value">${clientName}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">E-mail:</span>
            <span class="detail-value">${email}</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Valor:</span>
            <span class="detail-value">${areas[area]?.price || 'A consultar'}</span>
        </div>
    `;

    // Gerar número de protocolo
    const protocolNumber = generateProtocolNumber();
    document.getElementById('protocolNumber').textContent = protocolNumber;

    // Aqui você normalmente enviaria os dados para o servidor
    console.log('Dados do agendamento:', {
        area, lawyer, consultationType, date, time,
        clientName, cpf, email, phone,
        protocolNumber
    });
}

// Função auxiliar para obter label do tipo de consulta
function getConsultationTypeLabel(type) {
    const labels = {
        presencial: 'Presencial',
        online: 'Online (Zoom/Meet)',
        telefone: 'Telefone'
    };
    return labels[type] || type;
}

// Função para formatar data
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Função para gerar número de protocolo
function generateProtocolNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `PROT-${timestamp}-${random.toString().padStart(4, '0')}`;
}

// Função para formatar CPF
function formatCPF(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
}

// Função para formatar telefone
function formatPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
}

