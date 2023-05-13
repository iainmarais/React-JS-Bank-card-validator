function generateSessionId() 
{
    // generate a unique session ID
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${random}`;
}
  
class SessionManager 
{
    constructor() 
    {
        this.sessions = new Map();
    }
  
    createSession(userId) 
    {
      const sessionId = generateSessionId();
      const session = { userId };
      this.sessions.set(sessionId, session);
      return sessionId;
    }
  
    getSession(sessionId) 
    {
      return this.sessions.get(sessionId);
    }
  
    deleteSession(sessionId) 
    {
      this.sessions.delete(sessionId);
    }
}
  
export default SessionManager;