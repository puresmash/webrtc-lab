## Explain the events order
```mermaid
sequenceDiagram
  participant PC1
  participant Server
  participant PC2
    Note over PC1,PC2: To be able to find the correct WebSocket connection later
    PC1->>Server: Name the WS connection
    PC2->>Server: Name the WS connection
    Note over PC1,PC2: Offer SDP
    Note right of PC1: pc1.createOffer<br/>pc1.setLocalDescription
    PC1->>Server: Offer PC1's SDP to PC2
    Server->>PC2: Proxy the SDP to PC2
    Note left of PC2: pc2.setRemoteDescription
    Note over PC1,PC2: ICE propagate
    PC1->>Server: Send collected ice candidate
    Server->>PC2: Proxy the ice candidate

    Note over PC1,PC2: Answer SDP
    Note left of PC2: pc2.createAnswer<br/>pc2.setLocalDescription
    PC2->>Server: Answer PC2's SDP to PC1
    Server->>PC1: Proxy the SDP to PC1
    Note right of PC1: pc1.setRemoteDescription
    Note over PC1,PC2: ICE propagate
    PC2->>Server: Send collected ice candidate
    Server->>PC1: Proxy the ice candidate
```

## How to use
### Build client
```sh
npm run build-client
```
### Build and start resource server
```sh
npm run build-server
npm start
```
### Start websocket server
```sh
npm run start-ws-server
```
### Demo
http://localhost:3000/index.html
