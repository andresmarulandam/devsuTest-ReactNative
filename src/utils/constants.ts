export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const COLORS = {
  primary: '#fde913',
  secondary: '#6C757D',
  danger: '#ec4354',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#dbdee2',
  darkGray: '#343A40',
  border: '#DEE2E6',
  text: '#212529',
} as const;

export const VALIDATION = {
  id: {
    min: 3,
    max: 10,
  },
  name: {
    min: 5,
    max: 100,
  },
  description: {
    min: 10,
    max: 200,
  },
} as const;

export const ERROR_MESSAGES = {
  idRequired: 'El ID es requerido',
  nameRequired: 'El nombre es requerido',
  descriptionRequired: 'La descripción es requerida',
  logoRequired: 'El logo es requerido',
  dateReleaseRequired: 'La fecha de liberación es requerida',
  dateRevisionRequired: 'La fecha de revisión es requerida',

  idMinLength: `El ID debe tener al menos ${VALIDATION.id.min} caracteres`,
  idMaxLength: `El ID debe tener máximo ${VALIDATION.id.max} caracteres`,
  nameMinLength: `El nombre debe tener al menos ${VALIDATION.name.min} caracteres`,
  nameMaxLength: `El nombre debe tener máximo ${VALIDATION.name.max} caracteres`,
  descriptionMinLength: `La descripción debe tener al menos ${VALIDATION.description.min} caracteres`,
  descriptionMaxLength: `La descripción debe tener máximo ${VALIDATION.description.max} caracteres`,

  dateReleaseInvalid: 'La fecha debe ser igual o mayor a la actual',
  dateRevisionInvalid:
    'La fecha debe ser exactamente un año posterior a la fecha de liberación',

  logoInvalidUrl: 'El logo debe ser una URL válida',

  idExists: 'Este ID ya existe',
  idNotFound: 'ID no encontrado',

  networkError: 'Error de conexión. Verifica tu red',
  timeoutError: 'La solicitud excedió el tiempo de espera',
  serverError: 'Error del servidor. Intenta más tarde',
  unexpectedError: 'Ocurrió un error inesperado',
} as const;

export const SUCCESS_MESSAGES = {
  productCreated: 'Producto creado exitosamente',
  productUpdated: 'Producto actualizado exitosamente',
  productDeleted: 'Producto eliminado exitosamente',
} as const;

export const CONFIRM_MESSAGES = {
  deleteProduct: '¿Estás seguro de eliminar el producto',
} as const;

export const TEST_IDS = {
  searchInput: 'search-input',
  productList: 'product-list',
  productCard: 'product-card',
  addButton: 'add-button',
  editButton: 'edit-button',
  deleteButton: 'delete-button',
  formId: 'form-id',
  formName: 'form-name',
  formDescription: 'form-description',
  formLogo: 'form-logo',
  formDateRelease: 'form-date-release',
  formDateRevision: 'form-date-revision',
  formSubmit: 'form-submit',
  formReset: 'form-reset',
  modalContainer: 'modal-container',
  modalConfirm: 'modal-confirm',
  modalCancel: 'modal-cancel',
  skeletonCard: 'skeleton-card',
  skeletonDetail: 'skeleton-detail',
  detailContainer: 'detail-container',
} as const;

export const SCREEN_TITLES = {
  home: 'Banco',
  detail: 'Detalle del Producto',
  add: 'Agregar Producto',
  edit: 'Editar Producto',
} as const;

export const PLACEHOLDERS = {
  search: 'Search...',
  id: 'Ingresa el ID del producto',
  name: 'Ingresa el nombre del producto',
  description: 'Ingresa la descripción del producto',
  logo: 'Ingresa la URL del logo',
  dateRelease: 'Selecciona fecha de liberación',
  dateRevision: 'Selecciona fecha de revisión',
} as const;

export const BUTTON_TEXTS = {
  add: 'Agregar',
  edit: 'Editar',
  delete: 'Eliminar',
  save: 'Enviar',
  cancel: 'Cancelar',
  reset: 'Reiniciar',
  confirm: 'Confirmar',
  back: 'Volver',
} as const;
