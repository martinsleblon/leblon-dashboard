// ===== Login compartilhado Leblon Rolamentos =====
// Cada usuário tem uma senha só, valida em todas as páginas que ele tem acesso.
var LB_USERS = [
  { u: 'rafael',    p: 'Leblon1097',   nome: 'Rafael',    acesso: { dashboard: true, financeiro: 'view', folha: true, organograma: true, visitas: 'edit' } },
  { u: 'valdomiro', p: '1097leblon',   nome: 'Valdomiro', acesso: { dashboard: true, financeiro: 'view', folha: true, organograma: true, visitas: 'view' } },
  { u: 'tarsilla',  p: '1097tarsilla', nome: 'Tarsilla',  acesso: { financeiro: 'edit' } },
  { u: 'neusa',     p: '1097neusa',    nome: 'Neusa',     acesso: { financeiro: 'edit' } },
  { u: 'leblon',    p: 'industria1097',nome: 'Equipe',    acesso: { folha: true, organograma: true } }
];

function lbLogin(u, p) {
  u = (u || '').trim().toLowerCase();
  p = (p || '').trim();
  for (var i = 0; i < LB_USERS.length; i++) {
    if (LB_USERS[i].u === u && LB_USERS[i].p === p) return LB_USERS[i];
  }
  return null;
}

function lbSaveSession(usr) {
  try { sessionStorage.setItem('lb_session_v1', JSON.stringify({ u: usr.u })); } catch (e) {}
}

function lbGetUser() {
  var s = null;
  try { s = sessionStorage.getItem('lb_session_v1'); } catch (e) {}
  if (!s) return null;
  var d;
  try { d = JSON.parse(s); } catch (e) { return null; }
  for (var i = 0; i < LB_USERS.length; i++) {
    if (LB_USERS[i].u === d.u) return LB_USERS[i];
  }
  return null;
}

// Retorna {nivel:'view'|'edit', nome, usr} se a sessão atual pode acessar essa página, senão null
function lbAccess(page) {
  var usr = lbGetUser();
  if (!usr) return null;
  var a = usr.acesso[page];
  if (!a) return null;
  return { nivel: a === true ? 'view' : a, nome: usr.nome, usr: usr };
}
