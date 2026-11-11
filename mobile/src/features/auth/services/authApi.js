import { postJson } from '../../../shared/services/api';

export function login(email, senha) {
  return postJson('/api/entrar', { email, senha });
}
