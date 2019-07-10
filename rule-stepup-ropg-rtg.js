function(user, context, callback) {
  
  if(context.protocol === 'oauth2-refresh-token') {

    let privilegeScope = configuration.PRIVILEGE_SCOPE;
    
    if(context.request.body.scope) {
      
      var requestedScopes = context.request.body.scope.split(' ');
      console.log(requestedScopes);
      
      if(requestedScopes && requestedScopes.find(e => e === privilegeScope)) {
        
        // check user is authorized for privilege scope - TBD

        // grant privilege scope (and enforce 2FA)
        context.accessToken.scope = privilegeScope;
        
        // enforce 2FA
        context.multifactor = {
           provider: 'any'
        };
      }
    }
  }
  callback(null, user, context);
}