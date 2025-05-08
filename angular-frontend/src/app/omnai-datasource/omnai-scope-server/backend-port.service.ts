import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class BackendPortService {
    /**
     * BackendPortService: Initialize and save the port for the OmnAIScope Backend 
     * 
     * Init function: Async receiving of Backend Port via IPC from the electron app 
     * Init function should only be used once in the app initializer context (app.config.ts)
     * 
     * The port is saved as a signal and can be used throughout the whole application. 
     * 
     * If no electron environment is used a warning is printed. 
     */
    port = signal<number | null>(null); 

    async init():Promise<void>{
        if (typeof window !== 'undefined' && window.electronAPI) {
            const port = await window.electronAPI.getOmnAIScopeBackendPort(); 
            this.port.set(port);
          } else {
            console.warn('Electron API not available (probably SSR)');
          }
    }
  }
  