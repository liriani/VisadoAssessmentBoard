// ============================================================================
// DATOS DEL ASSESSMENT (ARCHIVO BASE)
// ============================================================================

export const regularizacionNodes = [
  { id: 'start', x: 600, y: 50, title: 'INICIO: Reg. Extraordinaria', text: 'Evaluación de elegibilidad\nReal Decreto 316/2026', type: 'start' },
  { id: 'q1', x: 600, y: 200, title: 'Filtro 1: Llegada', text: '¿Llegó a España antes del 01/01/2026?', type: 'filter' },
  { id: 'q2', x: 600, y: 350, title: 'Filtro 2: Permanencia', text: '¿Ha permanecido al menos 5 meses ininterrumpidos?', type: 'filter' },
  { id: 'q3', x: 600, y: 500, title: 'Filtro 3: Penales', text: '¿Tiene antecedentes penales en los últimos 5 años?', type: 'filter' },
  { id: 'q4', x: 600, y: 650, title: 'Filtro 4: Expulsión', text: '¿Tiene prohibición de entrada o alerta de expulsión?', type: 'filter' },
  { id: 'fail', x: 1000, y: 400, title: '❌ No Elegible', text: 'El solicitante no cumple con los criterios básicos excluyentes para esta vía.', type: 'error' },
  { id: 'q5', x: 600, y: 800, title: 'Perfil del Solicitante', text: 'Determine la situación actual del extranjero:', type: 'branch' },
  { id: 'rutaA', x: 200, y: 1000, title: '📄 Ruta A: Asilo', text: '• Solicitud de asilo previa al 01/01/2026\n• Pasaporte válido/caducado\n• Resguardo asilo (tarjeta roja/blanca)\n• Pruebas permanencia 5 meses\n• Tasa 052\n• Formulario EX31', type: 'result' },
  { id: 'rutaB', x: 600, y: 1000, title: '💼 Ruta B: General', text: '• Irregular previa al 01/01/2026\n• Pasaporte\n• Pruebas de llegada a España\n• Pruebas permanencia 5 meses\n• Doc. Laboral / Familiar / Vulnerabilidad\n• Tasa 052\n• Formulario EX32', type: 'result' },
  { id: 'rutaC', x: 1000, y: 1000, title: '🧒 Ruta C: Menores', text: '• Hijo/a de solicitante o residente\n• Pasaporte\n• Certificado Nacimiento\n• Doc. del progenitor\n• Exento de demostrar medios económicos', type: 'result' },
];

export const regularizacionEdges = [
  { id: 'e-start-q1', from: 'start', to: 'q1', label: 'Iniciar' },
  { id: 'e-q1-q2', from: 'q1', to: 'q2', label: 'SÍ' },
  { id: 'e-q1-fail', from: 'q1', to: 'fail', label: 'NO' },
  { id: 'e-q2-q3', from: 'q2', to: 'q3', label: 'SÍ' },
  { id: 'e-q2-fail', from: 'q2', to: 'fail', label: 'NO' },
  { id: 'e-q3-q4', from: 'q3', to: 'q4', label: 'NO' },
  { id: 'e-q3-fail', from: 'q3', to: 'fail', label: 'SÍ' },
  { id: 'e-q4-q5', from: 'q4', to: 'q5', label: 'NO' },
  { id: 'e-q4-fail', from: 'q4', to: 'fail', label: 'SÍ' },
  { id: 'e-q5-rutaA', from: 'q5', to: 'rutaA', label: 'Opción A: Solicitante Asilo' },
  { id: 'e-q5-rutaB', from: 'q5', to: 'rutaB', label: 'Opción B: Irregular General' },
  { id: 'e-q5-rutaC', from: 'q5', to: 'rutaC', label: 'Opción C: Menor Edad' },
];

export const nomadNodes = [
  { id: 'start_dn', x: 600, y: 50, title: 'INICIO: Nómada Digital', text: 'Teletrabajador de Carácter Internacional\n(Ley de Startups 28/2022)', type: 'start' },
  { id: 'dn_q1', x: 600, y: 200, title: 'Filtro 1: Naturaleza del Trabajo', text: '¿Su trabajo se realiza de forma exclusiva por medios y sistemas informáticos/telemáticos?', type: 'filter' },
  { id: 'dn_fail_1', x: 1000, y: 200, title: '❌ No Elegible', text: 'El trabajo debe ser 100% en remoto mediante medios telemáticos.', type: 'error' },
  { id: 'dn_branch_1', x: 600, y: 350, title: 'Tipo de Trabajador', text: '¿Cuál es su relación laboral?', type: 'branch' },
  { id: 'dn_q_emp_1', x: 400, y: 500, title: 'Filtro: Antigüedad Empresa', text: '¿La empresa extranjera tiene actividad continuada de al menos 1 año?', type: 'filter' },
  { id: 'dn_q_emp_2', x: 400, y: 650, title: 'Filtro: Relación Laboral', text: '¿Lleva al menos 3 meses trabajando para esta empresa y tiene permiso para teletrabajar en España?', type: 'filter' },
  { id: 'dn_q_free_1', x: 800, y: 500, title: 'Filtro: Clientes', text: '¿Sus ingresos de empresas españolas representan un máximo del 20% del total?', type: 'filter' },
  { id: 'dn_q_free_2', x: 800, y: 650, title: 'Filtro: Relación Comercial', text: '¿Tiene una relación mercantil con empresas extranjeras de más de 1 año y contratos actuales vigentes (min 3 meses)?', type: 'filter' },
  { id: 'dn_fail_2', x: 1200, y: 575, title: '❌ Requisitos Laborales', text: 'No cumple con la antigüedad requerida de la empresa/clientes o el tiempo de relación laboral.', type: 'error' },
  { id: 'dn_q_qual', x: 600, y: 800, title: 'Filtro 3: Cualificación', text: '¿Es graduado universitario/FP grado superior de prestigio, O BIEN tiene al menos 3 años de experiencia profesional demostrable?', type: 'filter' },
  { id: 'dn_q_inc', x: 600, y: 950, title: 'Filtro 4: Ingresos Económicos', text: '¿Demuestra ingresos de al menos el 200% del Salario Mínimo (aprox. 2.646€/mes) o saldo equivalente en cuenta bancaria?', type: 'filter' },
  { id: 'dn_q_health', x: 600, y: 1100, title: 'Filtro 5: Salud y Penales', text: '¿Carece de antecedentes penales (5 años) y cuenta con seguro médico público o privado (sin copagos) válido en España?', type: 'filter' },
  { id: 'dn_fail_3', x: 1000, y: 950, title: '❌ Requisitos Generales', text: 'No cumple con los ingresos mínimos, la cualificación, antecedentes o seguro médico.', type: 'error' },
  { id: 'dn_success', x: 600, y: 1250, title: '✅ Elegible: CheckList Documentos', text: '• Pasaporte válido\n• Formulario de Solicitud (UGE)\n• Tasa (038 o 052)\n• Cert. Antecedentes Penales apostillado\n• Seguro Médico Completo\n• Título Univ. o CV + Pruebas de 3 años exp.\n• Contrato laboral/mercantil (teletrabajo)\n• Certificado empresa (1 año actividad)\n• Extractos bancarios / Nóminas (Ingresos)', type: 'result' },
];

export const nomadEdges = [
  { id: 'e_dn_s_q1', from: 'start_dn', to: 'dn_q1', label: 'Iniciar' },
  { id: 'e_dn_q1_b', from: 'dn_q1', to: 'dn_branch_1', label: 'SÍ' },
  { id: 'e_dn_q1_f', from: 'dn_q1', to: 'dn_fail_1', label: 'NO' },
  { id: 'e_dn_b_emp', from: 'dn_branch_1', to: 'dn_q_emp_1', label: 'Cuenta Ajena (Empleado)' },
  { id: 'e_dn_b_free', from: 'dn_branch_1', to: 'dn_q_free_1', label: 'Cuenta Propia (Freelance)' },
  { id: 'e_dn_emp1_emp2', from: 'dn_q_emp_1', to: 'dn_q_emp_2', label: 'SÍ' },
  { id: 'e_dn_emp1_f', from: 'dn_q_emp_1', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_emp2_qual', from: 'dn_q_emp_2', to: 'dn_q_qual', label: 'SÍ' },
  { id: 'e_dn_emp2_f', from: 'dn_q_emp_2', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_free1_free2', from: 'dn_q_free_1', to: 'dn_q_free_2', label: 'SÍ' },
  { id: 'e_dn_free1_f', from: 'dn_q_free_1', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_free2_qual', from: 'dn_q_free_2', to: 'dn_q_qual', label: 'SÍ' },
  { id: 'e_dn_free2_f', from: 'dn_q_free_2', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_qual_inc', from: 'dn_q_qual', to: 'dn_q_inc', label: 'SÍ' },
  { id: 'e_dn_qual_f', from: 'dn_q_qual', to: 'dn_fail_3', label: 'NO' },
  { id: 'e_dn_inc_health', from: 'dn_q_inc', to: 'dn_q_health', label: 'SÍ' },
  { id: 'e_dn_inc_f', from: 'dn_q_inc', to: 'dn_fail_3', label: 'NO' },
  { id: 'e_dn_health_suc', from: 'dn_q_health', to: 'dn_success', label: 'SÍ' },
  { id: 'e_dn_health_f', from: 'dn_q_health', to: 'dn_fail_3', label: 'NO' },
];

export const workNodes = [
  { id: 'start_wk', x: 600, y: 50, title: 'INICIO: Visado de Trabajo', text: 'Residencia y Trabajo Inicial\n(Ley Orgánica 4/2000 y RD 557/2011)', type: 'start' },
  { id: 'wk_q1', x: 600, y: 200, title: 'Filtro 1: Situación Regular', text: '¿Se encuentra fuera de España (o en España con un estatus legal que permita la modificación)?', type: 'filter' },
  { id: 'wk_fail_1', x: 1000, y: 200, title: '❌ No Elegible (Trabajo Inicial)', text: 'No puede solicitar un visado de trabajo inicial si se encuentra en situación irregular en España. Debe explorar opciones de Arraigo.', type: 'error' },
  { id: 'wk_q2', x: 600, y: 350, title: 'Filtro 2: Antecedentes', text: '¿Carece de antecedentes penales en España y en sus países de residencia previos (últimos 5 años)?', type: 'filter' },
  { id: 'wk_fail_2', x: 1000, y: 350, title: '❌ Denegación', text: 'Los antecedentes penales o prohibiciones de entrada impiden la concesión de esta autorización.', type: 'error' },
  { id: 'wk_branch', x: 600, y: 500, title: 'Tipo de Actividad', text: '¿Bajo qué modalidad pretende trabajar en España?', type: 'branch' },
  { id: 'wk_qa_1', x: 250, y: 650, title: 'Cuenta Ajena: Contrato', text: '¿Existe una oferta de empleo formal y un contrato de trabajo firmado (garantizando al menos el SMI)?', type: 'filter' },
  { id: 'wk_qa_2', x: 250, y: 800, title: 'Situación Nacional de Empleo', text: '¿El puesto está en el Catálogo de Ocupaciones de Difícil Cobertura, O BIEN el empleador tiene certificado del SEPE de insuficiencia de demandantes, O aplica excepción (Art. 40 - ej. nacionalidad peruana/chilena)?', type: 'filter' },
  { id: 'wk_qa_3', x: 250, y: 950, title: 'Solvencia del Empleador', text: '¿Puede el empleador acreditar medios económicos, materiales y personales suficientes para hacer frente al proyecto y al salario?', type: 'filter' },
  { id: 'wk_fail_ajena', x: -100, y: 800, title: '❌ No Elegible (Ajena)', text: 'Falta contrato válido, la ocupación no supera el filtro del SEPE, o la empresa no es solvente.', type: 'error' },
  { id: 'wk_succ_ajena', x: 250, y: 1150, title: '✅ Checklist: Cuenta Ajena', text: 'TRÁMITE EMPLEADOR EN ESPAÑA:\n• EX-03 Formulario\n• Contrato Trabajo\n• DNI/CIF Empleador\n• Solvencia Empleador (IRPF/Sociedades)\n• Cert. SEPE (si aplica)\n\nTRÁMITE TRABAJADOR EN CONSULADO:\n• Pasaporte\n• Cert. Penales\n• Cert. Médico\n• Copia de Autorización Concedida', type: 'result' },
  { id: 'wk_qp_1', x: 950, y: 650, title: 'Cuenta Propia: Plan de Negocio', text: '¿Cuenta con un Plan de Empresa/Negocio detallado indicando viabilidad técnica, comercial y financiera, y creación de empleo prevista?', type: 'filter' },
  { id: 'wk_qp_2', x: 950, y: 800, title: 'Inversión y Medios de Vida', text: '¿Demuestra poseer la inversión de capital necesaria para el negocio, MÁS los medios de vida suficientes para subsistir (min. 100% IPREM) descontando gastos?', type: 'filter' },
  { id: 'wk_qp_3', x: 950, y: 950, title: 'Cualificación/Licencias', text: '¿Tiene la capacitación, titulación o experiencia requerida para la profesión, y las licencias de apertura/municipales necesarias (o en trámite)?', type: 'filter' },
  { id: 'wk_fail_propia', x: 1350, y: 800, title: '❌ No Elegible (Propia)', text: 'Plan de negocio inviable, falta de capital de inversión, o carencia de cualificaciones/licencias.', type: 'error' },
  { id: 'wk_succ_propia', x: 950, y: 1150, title: '✅ Checklist: Cuenta Propia', text: '• EX-07 Formulario\n• Pasaporte en vigor\n• Cert. Penales y Médico\n• Plan de Negocio (preferiblemente evaluado por UPTA, ATA, etc.)\n• Acreditación Inversión (Extractos, proformas)\n• Títulos/Cualificaciones\n• Justificantes solicitud licencias', type: 'result' },
];

export const workEdges = [
  { id: 'e_wk_s_q1', from: 'start_wk', to: 'wk_q1', label: 'Iniciar' },
  { id: 'e_wk_q1_q2', from: 'wk_q1', to: 'wk_q2', label: 'SÍ (Fuera/Legal)' },
  { id: 'e_wk_q1_f', from: 'wk_q1', to: 'wk_fail_1', label: 'NO (Irregular)' },
  { id: 'e_wk_q2_b', from: 'wk_q2', to: 'wk_branch', label: 'SÍ (Sin penales)' },
  { id: 'e_wk_q2_f', from: 'wk_q2', to: 'wk_fail_2', label: 'NO' },
  { id: 'e_wk_b_a', from: 'wk_branch', to: 'wk_qa_1', label: 'Cuenta Ajena (Empleado)' },
  { id: 'e_wk_b_p', from: 'wk_branch', to: 'wk_qp_1', label: 'Cuenta Propia (Autónomo)' },
  { id: 'e_wk_qa1_qa2', from: 'wk_qa_1', to: 'wk_qa_2', label: 'SÍ' },
  { id: 'e_wk_qa1_f', from: 'wk_qa_1', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qa2_qa3', from: 'wk_qa_2', to: 'wk_qa_3', label: 'SÍ' },
  { id: 'e_wk_qa2_f', from: 'wk_qa_2', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qa3_suc', from: 'wk_qa_3', to: 'wk_succ_ajena', label: 'SÍ' },
  { id: 'e_wk_qa3_f', from: 'wk_qa_3', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qp1_qp2', from: 'wk_qp_1', to: 'wk_qp_2', label: 'SÍ' },
  { id: 'e_wk_qp1_f', from: 'wk_qp_1', to: 'wk_fail_propia', label: 'NO' },
  { id: 'e_wk_qp2_qp3', from: 'wk_qp_2', to: 'wk_qp_3', label: 'SÍ' },
  { id: 'e_wk_qp2_f', from: 'wk_qp_2', to: 'wk_fail_propia', label: 'NO' },
  { id: 'e_wk_qp3_suc', from: 'wk_qp_3', to: 'wk_succ_propia', label: 'SÍ' },
  { id: 'e_wk_qp3_f', from: 'wk_qp_3', to: 'wk_fail_propia', label: 'NO' },
];

export const studentNodes = [
  { id: 'start_st', x: 600, y: 50, title: 'INICIO: Estancia por Estudios', text: 'Estudios, Formación o Investigación\n(Art. 37-42 Ley de Extranjería)', type: 'start' },
  { id: 'st_q1', x: 600, y: 200, title: 'Filtro 1: Ubicación y Plazo', text: '¿Se encuentra fuera de España (aplica en Consulado) O BIEN está en España legalmente y le queda al menos 1 mes de estancia legal para aplicar (Extranjería)?', type: 'filter' },
  { id: 'st_fail_1', x: 1000, y: 200, title: '❌ No Elegible (Irregular/Plazo)', text: 'No puede aplicar desde España si está en situación irregular o si le quedan menos de 30 días de su visado/estancia de turista.', type: 'error' },
  { id: 'st_q2', x: 600, y: 350, title: 'Filtro 2: Centro Educativo', text: '¿Tiene admisión definitiva en un centro de enseñanza autorizado en España, para un programa a tiempo completo (mín. 20h/sem) que culmine en título o certificado?', type: 'filter' },
  { id: 'st_fail_2', x: 1000, y: 350, title: '❌ Matrícula Inválida', text: 'El curso debe ser presencial (o semipresencial autorizado), mínimo 20h a la semana y en un centro reconocido.', type: 'error' },
  { id: 'st_q3', x: 600, y: 500, title: 'Filtro 3: Medios Económicos', text: '¿Demuestra fondos para subsistir (100% IPREM mensual, aprox. 600€) multiplicados por los meses del curso, con la matrícula ya pagada y el alojamiento garantizado?', type: 'filter' },
  { id: 'st_fail_3', x: 1000, y: 500, title: '❌ Fondos Insuficientes', text: 'Debe demostrar tener el dinero en cuenta (propia o de familiares directos) o una beca que cubra el IPREM requerido.', type: 'error' },
  { id: 'st_q4', x: 600, y: 650, title: 'Filtro 4: Seguro, Médico y Penales', text: '¿Tiene seguro médico español completo (sin copagos/carencias)? Y si el curso dura MÁS de 6 meses: ¿Carece de antecedentes penales (5 años) y tiene Certificado Médico?', type: 'filter' },
  { id: 'st_fail_4', x: 1000, y: 650, title: '❌ Requisitos Generales', text: 'Falta cobertura médica adecuada o los certificados obligatorios para estancias superiores a 180 días.', type: 'error' },
  { id: 'st_succ', x: 600, y: 850, title: '✅ Checklist: Visado/Estancia Estudios', text: '• EX-00 (España) o Formulario Nacional (Consulado)\n• Pasaporte Completo\n• Carta Admisión Centro Educativo\n• Justificante pago de matrícula\n• Extractos bancarios / Beca (Medios Económicos)\n• Póliza Seguro Médico (Sin copagos ni carencias)\n• Tasa (052 o consular)\n\nSI > 6 MESES AÑADIR:\n• Cert. Penales apostillado\n• Cert. Médico (RSI 2005)\n\nSI MENOR DE EDAD AÑADIR:\n• Certificado Nacimiento\n• Autorización notarial de los padres', type: 'result' },
];

export const studentEdges = [
  { id: 'e_st_s_q1', from: 'start_st', to: 'st_q1', label: 'Iniciar' },
  { id: 'e_st_q1_q2', from: 'st_q1', to: 'st_q2', label: 'SÍ' },
  { id: 'e_st_q1_f', from: 'st_q1', to: 'st_fail_1', label: 'NO' },
  { id: 'e_st_q2_q3', from: 'st_q2', to: 'st_q3', label: 'SÍ' },
  { id: 'e_st_q2_f', from: 'st_q2', to: 'st_fail_2', label: 'NO' },
  { id: 'e_st_q3_q4', from: 'st_q3', to: 'st_q4', label: 'SÍ' },
  { id: 'e_st_q3_f', from: 'st_q3', to: 'st_fail_3', label: 'NO' },
  { id: 'e_st_q4_suc', from: 'st_q4', to: 'st_succ', label: 'SÍ' },
  { id: 'e_st_q4_f', from: 'st_q4', to: 'st_fail_4', label: 'NO' },
];

export const nonLucrativeNodes = [
  { id: 'start_nl', x: 600, y: 50, title: 'INICIO: Residencia No Lucrativa', text: 'Residir en España sin ejercer actividad laboral\n(Art. 46-49 Reglamento Extranjería)', type: 'start' },
  { id: 'nl_q1', x: 600, y: 200, title: 'Filtro 1: Ubicación', text: '¿Se encuentra fuera de España (en su país de origen o donde tenga residencia legal comprobable)?', type: 'filter' },
  { id: 'nl_fail_1', x: 1000, y: 200, title: '❌ Error de Procedimiento', text: 'Este visado inicial NO puede solicitarse estando dentro de España como turista. Debe tramitarse en el Consulado de su demarcación.', type: 'error' },
  { id: 'nl_q2', x: 600, y: 350, title: 'Filtro 2: Intención Laboral', text: '¿Se compromete a no realizar NINGUNA actividad laboral o profesional (incluyendo teletrabajo) durante su residencia en España?', type: 'filter' },
  { id: 'nl_fail_2', x: 1000, y: 350, title: '❌ Visado Incorrecto', text: 'Si su intención es teletrabajar, debe solicitar la Nómada Digital. Si va a montar un negocio, el Visado por Cuenta Propia.', type: 'error' },
  { id: 'nl_q3', x: 600, y: 500, title: 'Filtro 3: Medios Económicos', text: '¿Dispone de ingresos pasivos, rentas, pensiones o ahorros propios garantizados que superen el 400% del IPREM mensual durante 1 año (aprox. 28.800€/año), más 100% extra por cada familiar?', type: 'filter' },
  { id: 'nl_fail_3', x: 1000, y: 500, title: '❌ Fondos Insuficientes o Inválidos', text: 'Debe demostrar solvencia sostenida sin depender de un salario actual. Las nóminas de empleo remoto activo no son válidas para esta vía.', type: 'error' },
  { id: 'nl_q4', x: 600, y: 650, title: 'Filtro 4: Salud y Penales', text: '¿Tiene seguro médico español privado integral (sin copagos ni carencias), Certificado Médico (RSI 2005) y carece de antecedentes penales en los últimos 5 años?', type: 'filter' },
  { id: 'nl_fail_4', x: 1000, y: 650, title: '❌ Denegación Asegurada', text: 'Los seguros de viaje o con franquicias/copagos son automáticamente rechazados por el consulado. Los antecedentes también bloquean el trámite.', type: 'error' },
  { id: 'nl_succ', x: 600, y: 850, title: '✅ Checklist: Visado No Lucrativa', text: '• Formulario EX-01 y Formulario Consular\n• Pasaporte en vigor (mín. 1 año de validez)\n• Certificado Penales Apostillado/Legalizado\n• Cert. Médico (Reglamento Sanitario Int. 2005)\n• Seguro Médico Español (cobertura total y repatriación preferiblemente)\n• Demostración económica (extractos bancarios de 6-12 meses, certificados de pensiones, rentas de alquiler, dividendos)\n• Tasas consulares y Modelo 790 código 052', type: 'result' },
];

export const nonLucrativeEdges = [
  { id: 'e_nl_s_q1', from: 'start_nl', to: 'nl_q1', label: 'Iniciar' },
  { id: 'e_nl_q1_q2', from: 'nl_q1', to: 'nl_q2', label: 'SÍ' },
  { id: 'e_nl_q1_f', from: 'nl_q1', to: 'nl_fail_1', label: 'NO (En España)' },
  { id: 'e_nl_q2_q3', from: 'nl_q2', to: 'nl_q3', label: 'SÍ' },
  { id: 'e_nl_q2_f', from: 'nl_q2', to: 'nl_fail_2', label: 'NO' },
  { id: 'e_nl_q3_q4', from: 'nl_q3', to: 'nl_q4', label: 'SÍ' },
  { id: 'e_nl_q3_f', from: 'nl_q3', to: 'nl_fail_3', label: 'NO' },
  { id: 'e_nl_q4_suc', from: 'nl_q4', to: 'nl_succ', label: 'SÍ' },
  { id: 'e_nl_q4_f', from: 'nl_q4', to: 'nl_fail_4', label: 'NO' },
];

export const jobSeekerNodes = [
  { id: 'start_js', x: 600, y: 50, title: 'INICIO: Búsqueda de Empleo', text: 'Permisos para buscar trabajo en España\n(Estudiantes o Hijos/Nietos de Españoles)', type: 'start' },
  { id: 'js_q1', x: 600, y: 200, title: 'Filtro 1: Perfil del Solicitante', text: '¿Pertenece a alguno de estos grupos?\n1. Estudiante en España a punto de graduarse o recién graduado.\n2. Hijo o nieto de español de origen residente en el extranjero.', type: 'filter' },
  { id: 'js_fail_1', x: 1000, y: 200, title: '❌ No Elegible (Vía Directa)', text: 'Si no es estudiante recién graduado en España ni descendiente de español, no existe un "visado de búsqueda de empleo" genérico. Debe conseguir una oferta de trabajo desde su país.', type: 'error' },
  { id: 'js_branch', x: 600, y: 350, title: 'Bifurcación de Vías', text: 'Seleccione su perfil específico:', type: 'branch' },
  { id: 'js_qa_1', x: 250, y: 500, title: 'Filtro: Nivel de Estudios', text: '¿Ha superado los estudios en una Institución de Educación Superior (Nivel mínimo 6: Grado, Máster o Doctorado) en España?', type: 'filter' },
  { id: 'js_qa_fail_1', x: -100, y: 500, title: '❌ Nivel Insuficiente', text: 'Los cursos de idiomas, certificados de profesionalidad o grados medios/superiores (FP) no dan acceso a este permiso específico. Deben ser estudios universitarios/superiores.', type: 'error' },
  { id: 'js_qa_2', x: 250, y: 650, title: 'Filtro: Medios y Seguro', text: '¿Dispone de seguro médico (sin copagos) y fondos suficientes (100% IPREM, aprox. 600€/mes) para mantenerse durante 12 meses sin trabajar?', type: 'filter' },
  { id: 'js_qa_fail_2', x: -100, y: 650, title: '❌ Fondos/Seguro Insuficiente', text: 'Es obligatorio demostrar solvencia económica y cobertura sanitaria mientras se busca empleo.', type: 'error' },
  { id: 'js_succ_a', x: 250, y: 850, title: '✅ Checklist: Residencia Búsqueda Empleo (Estudiantes)', text: 'Trámite desde España (dentro de los 60 días previos a caducar NIE o 90 días posteriores):\n• Formulario EX-01\n• Título universitario o certificado de haber superado los estudios\n• Seguro médico sin carencias/copagos\n• Extractos bancarios (Solvencia 100% IPREM x 12 meses)\n• Tasa 052 (Epígrafe 2.1)\n\n*Nota: Dura 12 meses (24m en algunas CCAA). Si encuentra empleo, se modifica a residencia y trabajo.*', type: 'result' },
  { id: 'js_qb_1', x: 950, y: 500, title: 'Filtro: Solicitud Consular', text: '¿Se encuentra en su país de residencia legal y puede demostrar documentalmente su vínculo como hijo o nieto de un español de origen?', type: 'filter' },
  { id: 'js_qb_fail_1', x: 1350, y: 500, title: '❌ No Elegible', text: 'Debe aplicar obligatoriamente desde el Consulado de España en su demarcación presentando los certificados de nacimiento correspondientes.', type: 'error' },
  { id: 'js_succ_b', x: 950, y: 850, title: '✅ Checklist: Visado Búsqueda Empleo (Descendientes)', text: 'Trámite en Consulado de origen:\n• Formulario Visado Nacional\n• Pasaporte en vigor\n• Certificado de Nacimiento del solicitante (Apostillado)\n• Certificado de Nacimiento del ascendiente (Padre/Madre/Abuelo español de origen)\n• Certificado Antecedentes Penales\n• Certificado Médico\n• Tasa consular\n\n*Nota: Concede un visado de 3 meses para viajar a España. Si encuentra empleo, tramita la residencia desde España sin tener que regresar.*', type: 'result' },
];

export const jobSeekerEdges = [
  { id: 'e_js_start_q1', from: 'start_js', to: 'js_q1', label: 'Iniciar' },
  { id: 'e_js_q1_b', from: 'js_q1', to: 'js_branch', label: 'SÍ' },
  { id: 'e_js_q1_f', from: 'js_q1', to: 'js_fail_1', label: 'NO' },
  { id: 'e_js_b_a', from: 'js_branch', to: 'js_qa_1', label: 'Estudiante (Grado/Máster/Doctorado en España)' },
  { id: 'e_js_b_b', from: 'js_branch', to: 'js_qb_1', label: 'Hijo/Nieto de Español de Origen' },
  { id: 'e_js_qa1_qa2', from: 'js_qa_1', to: 'js_qa_2', label: 'SÍ' },
  { id: 'e_js_qa1_f', from: 'js_qa_1', to: 'js_qa_fail_1', label: 'NO' },
  { id: 'e_js_qa2_suc', from: 'js_qa_2', to: 'js_succ_a', label: 'SÍ' },
  { id: 'e_js_qa2_f', from: 'js_qa_2', to: 'js_qa_fail_2', label: 'NO' },
  { id: 'e_js_qb1_suc', from: 'js_qb_1', to: 'js_succ_b', label: 'SÍ' },
  { id: 'e_js_qb1_f', from: 'js_qb_1', to: 'js_qb_fail_1', label: 'NO' },
];

export const regularizacionNodes_en = [
  { id: 'start', x: 600, y: 50, title: 'START: Extraordinary Regularization', text: 'Eligibility Assessment\nRoyal Decree 316/2026', type: 'start' },
  { id: 'q1', x: 600, y: 200, title: 'Filter 1: Arrival', text: 'Did you arrive in Spain before 01/01/2026?', type: 'filter' },
  { id: 'q2', x: 600, y: 350, title: 'Filter 2: Stay', text: 'Have you stayed at least 5 uninterrupted months?', type: 'filter' },
  { id: 'q3', x: 600, y: 500, title: 'Filter 3: Criminal Record', text: 'Do you have a criminal record in the last 5 years?', type: 'filter' },
  { id: 'q4', x: 600, y: 650, title: 'Filter 4: Expulsion', text: 'Do you have an entry ban or expulsion alert?', type: 'filter' },
  { id: 'fail', x: 1000, y: 400, title: '❌ Not Eligible', text: 'The applicant does not meet the basic exclusionary criteria for this route.', type: 'error' },
  { id: 'q5', x: 600, y: 800, title: 'Applicant Profile', text: 'Determine the current situation of the foreign national:', type: 'branch' },
  { id: 'rutaA', x: 200, y: 1000, title: '📄 Route A: Asylum', text: '• Asylum application prior to 01/01/2026\n• Valid/expired passport\n• Asylum receipt (red/white card)\n• Proof of 5-month stay\n• Fee 052\n• Form EX31', type: 'result' },
  { id: 'rutaB', x: 600, y: 1000, title: '💼 Route B: General', text: '• Irregular status prior to 01/01/2026\n• Passport\n• Proof of arrival in Spain\n• Proof of 5-month stay\n• Work / Family / Vulnerability doc.\n• Fee 052\n• Form EX32', type: 'result' },
  { id: 'rutaC', x: 1000, y: 1000, title: '🧒 Route C: Minors', text: '• Child of applicant or resident\n• Passport\n• Birth Certificate\n• Parent\'s documentation\n• Exempt from proving financial means', type: 'result' },
];

export const regularizacionEdges_en = [
  { id: 'e-start-q1', from: 'start', to: 'q1', label: 'Start' },
  { id: 'e-q1-q2', from: 'q1', to: 'q2', label: 'YES' },
  { id: 'e-q1-fail', from: 'q1', to: 'fail', label: 'NO' },
  { id: 'e-q2-q3', from: 'q2', to: 'q3', label: 'YES' },
  { id: 'e-q2-fail', from: 'q2', to: 'fail', label: 'NO' },
  { id: 'e-q3-q4', from: 'q3', to: 'q4', label: 'NO' },
  { id: 'e-q3-fail', from: 'q3', to: 'fail', label: 'YES' },
  { id: 'e-q4-q5', from: 'q4', to: 'q5', label: 'NO' },
  { id: 'e-q4-fail', from: 'q4', to: 'fail', label: 'YES' },
  { id: 'e-q5-rutaA', from: 'q5', to: 'rutaA', label: 'Option A: Asylum Seeker' },
  { id: 'e-q5-rutaB', from: 'q5', to: 'rutaB', label: 'Option B: General Irregular' },
  { id: 'e-q5-rutaC', from: 'q5', to: 'rutaC', label: 'Option C: Minor' },
];

export const nomadNodes_en = [
  { id: 'start_dn', x: 600, y: 50, title: 'START: Digital Nomad', text: 'International Remote Worker\n(Startups Law 28/2022)', type: 'start' },
  { id: 'dn_q1', x: 600, y: 200, title: 'Filter 1: Nature of Work', text: 'Is your work performed exclusively via digital/telematic means?', type: 'filter' },
  { id: 'dn_fail_1', x: 1000, y: 200, title: '❌ Not Eligible', text: 'Work must be 100% remote via telematic means.', type: 'error' },
  { id: 'dn_branch_1', x: 600, y: 350, title: 'Worker Type', text: 'What is your employment relationship?', type: 'branch' },
  { id: 'dn_q_emp_1', x: 400, y: 500, title: 'Filter: Company Seniority', text: 'Has the foreign company been operating continuously for at least 1 year?', type: 'filter' },
  { id: 'dn_q_emp_2', x: 400, y: 650, title: 'Filter: Employment Relationship', text: 'Have you worked for this company for at least 3 months and have permission to telework in Spain?', type: 'filter' },
  { id: 'dn_q_free_1', x: 800, y: 500, title: 'Filter: Clients', text: 'Do Spanish companies represent a maximum of 20% of your total income?', type: 'filter' },
  { id: 'dn_q_free_2', x: 800, y: 650, title: 'Filter: Commercial Relationship', text: 'Do you have a commercial relationship with foreign companies for over 1 year and current active contracts (min 3 months)?', type: 'filter' },
  { id: 'dn_fail_2', x: 1200, y: 575, title: '❌ Employment Requirements', text: 'Does not meet the required company/client seniority or employment relationship duration.', type: 'error' },
  { id: 'dn_q_qual', x: 600, y: 800, title: 'Filter 3: Qualification', text: 'Are you a university graduate/higher vocational training, OR do you have at least 3 years of demonstrable professional experience?', type: 'filter' },
  { id: 'dn_q_inc', x: 600, y: 950, title: 'Filter 4: Income', text: 'Do you demonstrate income of at least 200% of the Minimum Wage (approx. €2,646/month) or equivalent bank balance?', type: 'filter' },
  { id: 'dn_q_health', x: 600, y: 1100, title: 'Filter 5: Health & Criminal Record', text: 'Do you have no criminal record (5 years) and hold public or private health insurance (no co-payments) valid in Spain?', type: 'filter' },
  { id: 'dn_fail_3', x: 1000, y: 950, title: '❌ General Requirements', text: 'Does not meet minimum income, qualification, criminal record, or health insurance requirements.', type: 'error' },
  { id: 'dn_success', x: 600, y: 1250, title: '✅ Eligible: Document Checklist', text: '• Valid passport\n• Application form (UGE)\n• Fee (038 or 052)\n• Apostilled criminal record certificate\n• Full health insurance\n• University degree or CV + 3 years exp. proof\n• Employment/commercial contract (remote work)\n• Company certificate (1 year activity)\n• Bank statements / Payslips (Income)', type: 'result' },
];

export const nomadEdges_en = [
  { id: 'e_dn_s_q1', from: 'start_dn', to: 'dn_q1', label: 'Start' },
  { id: 'e_dn_q1_b', from: 'dn_q1', to: 'dn_branch_1', label: 'YES' },
  { id: 'e_dn_q1_f', from: 'dn_q1', to: 'dn_fail_1', label: 'NO' },
  { id: 'e_dn_b_emp', from: 'dn_branch_1', to: 'dn_q_emp_1', label: 'Employee' },
  { id: 'e_dn_b_free', from: 'dn_branch_1', to: 'dn_q_free_1', label: 'Freelance' },
  { id: 'e_dn_emp1_emp2', from: 'dn_q_emp_1', to: 'dn_q_emp_2', label: 'YES' },
  { id: 'e_dn_emp1_f', from: 'dn_q_emp_1', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_emp2_qual', from: 'dn_q_emp_2', to: 'dn_q_qual', label: 'YES' },
  { id: 'e_dn_emp2_f', from: 'dn_q_emp_2', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_free1_free2', from: 'dn_q_free_1', to: 'dn_q_free_2', label: 'YES' },
  { id: 'e_dn_free1_f', from: 'dn_q_free_1', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_free2_qual', from: 'dn_q_free_2', to: 'dn_q_qual', label: 'YES' },
  { id: 'e_dn_free2_f', from: 'dn_q_free_2', to: 'dn_fail_2', label: 'NO' },
  { id: 'e_dn_qual_inc', from: 'dn_q_qual', to: 'dn_q_inc', label: 'YES' },
  { id: 'e_dn_qual_f', from: 'dn_q_qual', to: 'dn_fail_3', label: 'NO' },
  { id: 'e_dn_inc_health', from: 'dn_q_inc', to: 'dn_q_health', label: 'YES' },
  { id: 'e_dn_inc_f', from: 'dn_q_inc', to: 'dn_fail_3', label: 'NO' },
  { id: 'e_dn_health_suc', from: 'dn_q_health', to: 'dn_success', label: 'YES' },
  { id: 'e_dn_health_f', from: 'dn_q_health', to: 'dn_fail_3', label: 'NO' },
];

export const workNodes_en = [
  { id: 'start_wk', x: 600, y: 50, title: 'START: Work Visa', text: 'Initial Residence and Work\n(Organic Law 4/2000 and RD 557/2011)', type: 'start' },
  { id: 'wk_q1', x: 600, y: 200, title: 'Filter 1: Legal Status', text: 'Are you outside Spain (or in Spain with a legal status that allows modification)?', type: 'filter' },
  { id: 'wk_fail_1', x: 1000, y: 200, title: '❌ Not Eligible (Initial Work)', text: 'You cannot apply for an initial work visa if you are in an irregular situation in Spain. Explore Arraigo options.', type: 'error' },
  { id: 'wk_q2', x: 600, y: 350, title: 'Filter 2: Criminal Record', text: 'Do you have no criminal record in Spain or previous countries of residence (last 5 years)?', type: 'filter' },
  { id: 'wk_fail_2', x: 1000, y: 350, title: '❌ Denial', text: 'Criminal records or entry bans prevent granting this authorization.', type: 'error' },
  { id: 'wk_branch', x: 600, y: 500, title: 'Activity Type', text: 'Under which modality do you intend to work in Spain?', type: 'branch' },
  { id: 'wk_qa_1', x: 250, y: 650, title: 'Employed: Contract', text: 'Is there a formal job offer and signed employment contract (guaranteeing at least minimum wage)?', type: 'filter' },
  { id: 'wk_qa_2', x: 250, y: 800, title: 'National Employment Situation', text: 'Is the position in the Hard-to-Fill Occupations Catalogue, OR does the employer have a SEPE certificate of insufficient applicants, OR does an exception apply (Art. 40)?', type: 'filter' },
  { id: 'wk_qa_3', x: 250, y: 950, title: 'Employer Solvency', text: 'Can the employer demonstrate sufficient economic, material and personal means to carry out the project and pay the salary?', type: 'filter' },
  { id: 'wk_fail_ajena', x: -100, y: 800, title: '❌ Not Eligible (Employed)', text: 'Missing valid contract, occupation fails SEPE filter, or company is not solvent.', type: 'error' },
  { id: 'wk_succ_ajena', x: 250, y: 1150, title: '✅ Checklist: Employed', text: 'EMPLOYER PROCESS IN SPAIN:\n• EX-03 Form\n• Employment Contract\n• Employer ID/Tax Number\n• Employer Solvency (Tax returns)\n• SEPE Certificate (if applicable)\n\nWORKER PROCESS AT CONSULATE:\n• Passport\n• Criminal Record Cert.\n• Medical Certificate\n• Copy of Granted Authorization', type: 'result' },
  { id: 'wk_qp_1', x: 950, y: 650, title: 'Self-Employed: Business Plan', text: 'Do you have a detailed Business Plan showing technical, commercial and financial viability, and expected job creation?', type: 'filter' },
  { id: 'wk_qp_2', x: 950, y: 800, title: 'Investment & Living Means', text: 'Do you demonstrate the necessary capital investment for the business, PLUS sufficient living means (min. 100% IPREM) after expenses?', type: 'filter' },
  { id: 'wk_qp_3', x: 950, y: 950, title: 'Qualifications/Licenses', text: 'Do you have the required training, degree or experience for the profession, and the necessary opening/municipal licenses (or in process)?', type: 'filter' },
  { id: 'wk_fail_propia', x: 1350, y: 800, title: '❌ Not Eligible (Self-Employed)', text: 'Unviable business plan, lack of investment capital, or missing qualifications/licenses.', type: 'error' },
  { id: 'wk_succ_propia', x: 950, y: 1150, title: '✅ Checklist: Self-Employed', text: '• EX-07 Form\n• Valid passport\n• Criminal Record & Medical Cert.\n• Business Plan (ideally evaluated by UPTA, ATA, etc.)\n• Investment proof (bank statements, proformas)\n• Degrees/Qualifications\n• License application receipts', type: 'result' },
];

export const workEdges_en = [
  { id: 'e_wk_s_q1', from: 'start_wk', to: 'wk_q1', label: 'Start' },
  { id: 'e_wk_q1_q2', from: 'wk_q1', to: 'wk_q2', label: 'YES (Outside/Legal)' },
  { id: 'e_wk_q1_f', from: 'wk_q1', to: 'wk_fail_1', label: 'NO (Irregular)' },
  { id: 'e_wk_q2_b', from: 'wk_q2', to: 'wk_branch', label: 'YES (No record)' },
  { id: 'e_wk_q2_f', from: 'wk_q2', to: 'wk_fail_2', label: 'NO' },
  { id: 'e_wk_b_a', from: 'wk_branch', to: 'wk_qa_1', label: 'Employed' },
  { id: 'e_wk_b_p', from: 'wk_branch', to: 'wk_qp_1', label: 'Self-Employed' },
  { id: 'e_wk_qa1_qa2', from: 'wk_qa_1', to: 'wk_qa_2', label: 'YES' },
  { id: 'e_wk_qa1_f', from: 'wk_qa_1', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qa2_qa3', from: 'wk_qa_2', to: 'wk_qa_3', label: 'YES' },
  { id: 'e_wk_qa2_f', from: 'wk_qa_2', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qa3_suc', from: 'wk_qa_3', to: 'wk_succ_ajena', label: 'YES' },
  { id: 'e_wk_qa3_f', from: 'wk_qa_3', to: 'wk_fail_ajena', label: 'NO' },
  { id: 'e_wk_qp1_qp2', from: 'wk_qp_1', to: 'wk_qp_2', label: 'YES' },
  { id: 'e_wk_qp1_f', from: 'wk_qp_1', to: 'wk_fail_propia', label: 'NO' },
  { id: 'e_wk_qp2_qp3', from: 'wk_qp_2', to: 'wk_qp_3', label: 'YES' },
  { id: 'e_wk_qp2_f', from: 'wk_qp_2', to: 'wk_fail_propia', label: 'NO' },
  { id: 'e_wk_qp3_suc', from: 'wk_qp_3', to: 'wk_succ_propia', label: 'YES' },
  { id: 'e_wk_qp3_f', from: 'wk_qp_3', to: 'wk_fail_propia', label: 'NO' },
];

export const studentNodes_en = [
  { id: 'start_st', x: 600, y: 50, title: 'START: Student Stay', text: 'Studies, Training or Research\n(Art. 37-42 Immigration Law)', type: 'start' },
  { id: 'st_q1', x: 600, y: 200, title: 'Filter 1: Location & Deadline', text: 'Are you outside Spain (apply at Consulate) OR legally in Spain with at least 1 month of legal stay remaining?', type: 'filter' },
  { id: 'st_fail_1', x: 1000, y: 200, title: '❌ Not Eligible (Irregular/Deadline)', text: 'You cannot apply from Spain if you are in an irregular situation or have fewer than 30 days remaining on your visa/tourist stay.', type: 'error' },
  { id: 'st_q2', x: 600, y: 350, title: 'Filter 2: Educational Centre', text: 'Do you have definitive admission to an authorised educational centre in Spain, for a full-time programme (min. 20h/week) leading to a degree or certificate?', type: 'filter' },
  { id: 'st_fail_2', x: 1000, y: 350, title: '❌ Invalid Enrolment', text: 'The course must be in-person (or authorised blended), minimum 20h per week, at a recognised centre.', type: 'error' },
  { id: 'st_q3', x: 600, y: 500, title: 'Filter 3: Financial Means', text: 'Do you demonstrate funds to subsist (100% monthly IPREM, approx. €600) multiplied by the course months, with tuition already paid and accommodation guaranteed?', type: 'filter' },
  { id: 'st_fail_3', x: 1000, y: 500, title: '❌ Insufficient Funds', text: 'You must demonstrate the money in an account (own or close family) or a scholarship covering the required IPREM.', type: 'error' },
  { id: 'st_q4', x: 600, y: 650, title: 'Filter 4: Insurance, Medical & Criminal Record', text: 'Do you have full Spanish health insurance (no co-payments/waiting periods)? And if the course lasts MORE than 6 months: no criminal record (5 years) and a Medical Certificate?', type: 'filter' },
  { id: 'st_fail_4', x: 1000, y: 650, title: '❌ General Requirements', text: 'Missing adequate health coverage or mandatory certificates for stays over 180 days.', type: 'error' },
  { id: 'st_succ', x: 600, y: 850, title: '✅ Checklist: Student Visa/Stay', text: '• EX-00 (Spain) or National Form (Consulate)\n• Full Passport\n• Educational Centre Admission Letter\n• Tuition payment receipt\n• Bank statements / Scholarship (Financial Means)\n• Health Insurance Policy (No co-payments)\n• Fee (052 or consular)\n\nIF > 6 MONTHS ADD:\n• Apostilled Criminal Record Cert.\n• Medical Certificate (IHR 2005)\n\nIF MINOR ADD:\n• Birth Certificate\n• Notarised parental authorisation', type: 'result' },
];

export const studentEdges_en = [
  { id: 'e_st_s_q1', from: 'start_st', to: 'st_q1', label: 'Start' },
  { id: 'e_st_q1_q2', from: 'st_q1', to: 'st_q2', label: 'YES' },
  { id: 'e_st_q1_f', from: 'st_q1', to: 'st_fail_1', label: 'NO' },
  { id: 'e_st_q2_q3', from: 'st_q2', to: 'st_q3', label: 'YES' },
  { id: 'e_st_q2_f', from: 'st_q2', to: 'st_fail_2', label: 'NO' },
  { id: 'e_st_q3_q4', from: 'st_q3', to: 'st_q4', label: 'YES' },
  { id: 'e_st_q3_f', from: 'st_q3', to: 'st_fail_3', label: 'NO' },
  { id: 'e_st_q4_suc', from: 'st_q4', to: 'st_succ', label: 'YES' },
  { id: 'e_st_q4_f', from: 'st_q4', to: 'st_fail_4', label: 'NO' },
];

export const nonLucrativeNodes_en = [
  { id: 'start_nl', x: 600, y: 50, title: 'START: Non-Lucrative Residence', text: 'Reside in Spain without engaging in work\n(Art. 46-49 Immigration Regulations)', type: 'start' },
  { id: 'nl_q1', x: 600, y: 200, title: 'Filter 1: Location', text: 'Are you outside Spain (in your country of origin or where you have verifiable legal residence)?', type: 'filter' },
  { id: 'nl_fail_1', x: 1000, y: 200, title: '❌ Procedural Error', text: 'This initial visa CANNOT be applied for while inside Spain as a tourist. It must be processed at the Consulate of your jurisdiction.', type: 'error' },
  { id: 'nl_q2', x: 600, y: 350, title: 'Filter 2: Work Intention', text: 'Do you commit to NOT engaging in ANY work or professional activity (including remote work) during your residence in Spain?', type: 'filter' },
  { id: 'nl_fail_2', x: 1000, y: 350, title: '❌ Wrong Visa', text: 'If you intend to work remotely, apply for the Digital Nomad visa. If starting a business, apply for the Self-Employed visa.', type: 'error' },
  { id: 'nl_q3', x: 600, y: 500, title: 'Filter 3: Financial Means', text: 'Do you have guaranteed passive income, rents, pensions or savings exceeding 400% of the monthly IPREM for 1 year (approx. €28,800/year), plus 100% extra per family member?', type: 'filter' },
  { id: 'nl_fail_3', x: 1000, y: 500, title: '❌ Insufficient/Invalid Funds', text: 'You must demonstrate sustained solvency without relying on a current salary. Active remote employment payslips are not valid for this route.', type: 'error' },
  { id: 'nl_q4', x: 600, y: 650, title: 'Filter 4: Health & Criminal Record', text: 'Do you have comprehensive private Spanish health insurance (no co-payments or waiting periods), a Medical Certificate (IHR 2005), and no criminal record in the last 5 years?', type: 'filter' },
  { id: 'nl_fail_4', x: 1000, y: 650, title: '❌ Guaranteed Denial', text: 'Travel insurance or policies with excess/co-payments are automatically rejected by the consulate. Criminal records also block the process.', type: 'error' },
  { id: 'nl_succ', x: 600, y: 850, title: '✅ Checklist: Non-Lucrative Visa', text: '• EX-01 Form and Consular Form\n• Valid passport (min. 1 year validity)\n• Apostilled/Legalised Criminal Record Cert.\n• Medical Certificate (IHR 2005)\n• Spanish Health Insurance (full coverage incl. repatriation)\n• Financial proof (6-12 months bank statements, pension certs, rental income, dividends)\n• Consular fees and Form 790 code 052', type: 'result' },
];

export const nonLucrativeEdges_en = [
  { id: 'e_nl_s_q1', from: 'start_nl', to: 'nl_q1', label: 'Start' },
  { id: 'e_nl_q1_q2', from: 'nl_q1', to: 'nl_q2', label: 'YES' },
  { id: 'e_nl_q1_f', from: 'nl_q1', to: 'nl_fail_1', label: 'NO (In Spain)' },
  { id: 'e_nl_q2_q3', from: 'nl_q2', to: 'nl_q3', label: 'YES' },
  { id: 'e_nl_q2_f', from: 'nl_q2', to: 'nl_fail_2', label: 'NO' },
  { id: 'e_nl_q3_q4', from: 'nl_q3', to: 'nl_q4', label: 'YES' },
  { id: 'e_nl_q3_f', from: 'nl_q3', to: 'nl_fail_3', label: 'NO' },
  { id: 'e_nl_q4_suc', from: 'nl_q4', to: 'nl_succ', label: 'YES' },
  { id: 'e_nl_q4_f', from: 'nl_q4', to: 'nl_fail_4', label: 'NO' },
];

export const jobSeekerNodes_en = [
  { id: 'start_js', x: 600, y: 50, title: 'START: Job Search', text: 'Permits to seek employment in Spain\n(Students or Children/Grandchildren of Spaniards)', type: 'start' },
  { id: 'js_q1', x: 600, y: 200, title: 'Filter 1: Applicant Profile', text: 'Do you belong to one of these groups?\n1. Student in Spain about to graduate or recently graduated.\n2. Child or grandchild of a Spanish national residing abroad.', type: 'filter' },
  { id: 'js_fail_1', x: 1000, y: 200, title: '❌ Not Eligible (Direct Route)', text: 'If you are not a recently graduated student in Spain nor a descendant of a Spaniard, there is no generic "job search visa". You must obtain a job offer from your country.', type: 'error' },
  { id: 'js_branch', x: 600, y: 350, title: 'Route Bifurcation', text: 'Select your specific profile:', type: 'branch' },
  { id: 'js_qa_1', x: 250, y: 500, title: 'Filter: Level of Studies', text: 'Have you completed studies at a Higher Education Institution (minimum Level 6: Degree, Master or Doctorate) in Spain?', type: 'filter' },
  { id: 'js_qa_fail_1', x: -100, y: 500, title: '❌ Insufficient Level', text: 'Language courses, professional certificates or intermediate/higher vocational training (FP) do not grant access to this specific permit. Must be university/higher education.', type: 'error' },
  { id: 'js_qa_2', x: 250, y: 650, title: 'Filter: Means & Insurance', text: 'Do you have health insurance (no co-payments) and sufficient funds (100% IPREM, approx. €600/month) to support yourself for 12 months without working?', type: 'filter' },
  { id: 'js_qa_fail_2', x: -100, y: 650, title: '❌ Insufficient Funds/Insurance', text: 'It is mandatory to demonstrate financial solvency and health coverage while seeking employment.', type: 'error' },
  { id: 'js_succ_a', x: 250, y: 850, title: '✅ Checklist: Job Search Residence (Students)', text: 'Process from Spain (within 60 days before NIE expiry or 90 days after):\n• EX-01 Form\n• University degree or certificate of completed studies\n• Health insurance without waiting periods/co-payments\n• Bank statements (Solvency 100% IPREM x 12 months)\n• Fee 052 (Section 2.1)\n\n*Note: Lasts 12 months (24m in some regions). If employment found, modify to residence and work.*', type: 'result' },
  { id: 'js_qb_1', x: 950, y: 500, title: 'Filter: Consular Application', text: 'Are you in your country of legal residence and can you documentarily prove your link as a child or grandchild of a Spanish national?', type: 'filter' },
  { id: 'js_qb_fail_1', x: 1350, y: 500, title: '❌ Not Eligible', text: 'You must apply exclusively from the Spanish Consulate in your jurisdiction, presenting the corresponding birth certificates.', type: 'error' },
  { id: 'js_succ_b', x: 950, y: 850, title: '✅ Checklist: Job Search Visa (Descendants)', text: 'Process at home country Consulate:\n• National Visa Form\n• Valid passport\n• Applicant\'s Birth Certificate (Apostilled)\n• Ancestor\'s Birth Certificate (Spanish national father/mother/grandparent)\n• Criminal Record Certificate\n• Medical Certificate\n• Consular fee\n\n*Note: Grants a 3-month visa to travel to Spain. If employment found, process residence from Spain without returning.*', type: 'result' },
];

export const jobSeekerEdges_en = [
  { id: 'e_js_start_q1', from: 'start_js', to: 'js_q1', label: 'Start' },
  { id: 'e_js_q1_b', from: 'js_q1', to: 'js_branch', label: 'YES' },
  { id: 'e_js_q1_f', from: 'js_q1', to: 'js_fail_1', label: 'NO' },
  { id: 'e_js_b_a', from: 'js_branch', to: 'js_qa_1', label: 'Student (Degree/Master/Doctorate in Spain)' },
  { id: 'e_js_b_b', from: 'js_branch', to: 'js_qb_1', label: 'Child/Grandchild of Spanish National' },
  { id: 'e_js_qa1_qa2', from: 'js_qa_1', to: 'js_qa_2', label: 'YES' },
  { id: 'e_js_qa1_f', from: 'js_qa_1', to: 'js_qa_fail_1', label: 'NO' },
  { id: 'e_js_qa2_suc', from: 'js_qa_2', to: 'js_succ_a', label: 'YES' },
  { id: 'e_js_qa2_f', from: 'js_qa_2', to: 'js_qa_fail_2', label: 'NO' },
  { id: 'e_js_qb1_suc', from: 'js_qb_1', to: 'js_succ_b', label: 'YES' },
  { id: 'e_js_qb1_f', from: 'js_qb_1', to: 'js_qb_fail_1', label: 'NO' },
];

export const ASSESSMENTS = {
  es: {
    regularizacion: { nodes: regularizacionNodes, edges: regularizacionEdges },
    nomad:          { nodes: nomadNodes,          edges: nomadEdges },
    work:           { nodes: workNodes,           edges: workEdges },
    student:        { nodes: studentNodes,        edges: studentEdges },
    non_lucrative:  { nodes: nonLucrativeNodes,   edges: nonLucrativeEdges },
    job_seeker:     { nodes: jobSeekerNodes,      edges: jobSeekerEdges },
  },
  en: {
    regularizacion: { nodes: regularizacionNodes_en, edges: regularizacionEdges_en },
    nomad:          { nodes: nomadNodes_en,          edges: nomadEdges_en },
    work:           { nodes: workNodes_en,           edges: workEdges_en },
    student:        { nodes: studentNodes_en,        edges: studentEdges_en },
    non_lucrative:  { nodes: nonLucrativeNodes_en,   edges: nonLucrativeEdges_en },
    job_seeker:     { nodes: jobSeekerNodes_en,      edges: jobSeekerEdges_en },
  },
};
