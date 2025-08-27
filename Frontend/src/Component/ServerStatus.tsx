import { Alert, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { checkServerConnectivity } from "../utils/serverUtils";

const ServerStatus = () => {
  const [isServerOnline, setIsServerOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkServer = async () => {
      const online = await checkServerConnectivity();
      setIsServerOnline(online);
    };

    // Delay initial check to avoid showing offline message immediately
    const initialCheck = setTimeout(checkServer, 2000);
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServer, 30000);
    
    return () => {
      clearTimeout(initialCheck);
      clearInterval(interval);
    };
  }, []);

  if (isServerOnline === null) {
    return null; // Don't show anything while checking
  }

  if (!isServerOnline) {
    return (
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}>
        <Alert severity="warning" sx={{ maxWidth: 300 }}>
          Connection issue detected. Some features may be temporarily unavailable.
        </Alert>
      </Box>
    );
  }

  return null;
};

export default ServerStatus;
