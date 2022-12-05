export const walletAddressFormatted = (address: string): string => {
    return address.substr(0, 6) + '...' + address.substr(address.length - 5, 5);
}