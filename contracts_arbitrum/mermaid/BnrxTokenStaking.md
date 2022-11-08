#BNRX token staking

```mermaid
sequenceDiagram
User->>WebApp: navigate to '/staking' page
WebApp-->>User: render 'staking' page
User->>WebApp: click 'Stake' button and specify amount
WebApp->>RPC: stake({ amount })
RPC-->>WebApp: BNRX staked
Note over WebApp, RPC: start receiving rewards <br> from commissions
WebApp-->>User: update 'staking' page view
```
