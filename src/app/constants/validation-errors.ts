export abstract class Errors {
  static getMessage(errors: any): string {
    for (const error of Object.keys(errors)) {
      const requiredLength = errors[error]['requiredLength'] || '';
      return `${messages[error]} ${requiredLength}`;
    }
  }
}

const messages = {
  required: 'Este campo es requerido',
  min: 'El valor debe ser mayor a ',
  max: 'El valor debe ser menor a ',
  maxlength: 'La longitud debe ser menor a',
  minlength: 'La longitud debe ser mayor a',
  email: 'Formato de correo inválido',
  pattern: 'Este valor no es válido'
};
