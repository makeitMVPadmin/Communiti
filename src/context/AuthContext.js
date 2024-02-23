import { createContext, useState, useEffect } from 'react';
import '../Firebase/FirebaseAuth';

const AuthContext = createContext(null);

export default AuthContext;
