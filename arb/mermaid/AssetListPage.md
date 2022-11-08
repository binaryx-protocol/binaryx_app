#Asset List Page

## Asset List
```mermaid
sequenceDiagram
autonumber

User->>WebApp: navigate to '/assets' page
WebApp->>RPC: getAssets({ page, status })
RPC-->>WebApp: Assets (title, addr, rates, token data)
WebApp-->>User: Render Assets
```

## Update Asset Status
```mermaid
sequenceDiagram
autonumber

User->>WebApp: navigate to '/assets' page
WebApp->>RPC: getAssets({ page, status })
RPC-->>WebApp: Assets (title, addr, rates, token data)
WebApp-->>User: Render assets
WebApp->>Wallet: Connect user & Network
Wallet-->>WebApp: Web3 Provider
WebApp->>RPC: getPermissions()
RPC-->>WebApp: Permissions
opt has edit permissions
WebApp-->>User: Enable editing capabilities
User->>WebApp: Select new status
WebApp->>RPC: updateAssetStatus({ id, status })
RPC-->>WebApp: Status updated
WebApp-->>User: Render updated assets

end  
```
