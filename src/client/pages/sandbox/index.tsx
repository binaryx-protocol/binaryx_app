import {ethers} from "ethers";
import {useAtomValue, useSetAtom} from "jotai";
import * as metaMaskModel from "../../app/models/metaMaskModel";
import {useEffect} from "react";
import * as featureFlagsModel from "../../app/models/featureFlagsModel";

const SandboxPage = () => {
    const $featureFlags = useAtomValue(featureFlagsModel.$featureFlags)
    const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
    const $onBrowserInit = useSetAtom(metaMaskModel.$onBrowserInit)

    const doTheSwap = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const sgAbi = [
            // Some details about the token
            "function name() view returns (string)",
            "function symbol() view returns (string)",

            // Get the account balance
            "function balanceOf(address) view returns (uint)",

            // Send some of your tokens to someone else
            "function transfer(address to, uint amount)",
            "function approve(address spender, uint256 amount) public virtual override returns (bool)",

            // An event triggered whenever anyone transfers to someone else
            "event Transfer(address indexed from, address indexed to, uint amount)"
        ];
        const vendorAbi = [
            "function swapSgToDai(uint256 amountToBuy) public",
        ];

        const sgToken = new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', sgAbi, provider);
        const sgTokenSigned = sgToken.connect(provider.getSigner())

        const approve = await sgTokenSigned.approve('0x0165878A594ca255338adfa4d48449f69242Eb8F', 1e14)
        console.log('approve', approve)

        const vendorToken = new ethers.Contract('0x0165878A594ca255338adfa4d48449f69242Eb8F', vendorAbi, provider);
        const vendorTokenSigned = vendorToken.connect(provider.getSigner())

        const swapSgToDai = await vendorTokenSigned.swapSgToDai(1e14)
        console.log('swapSgToDai', swapSgToDai)
    }

    useEffect(() => {
        if ($featureFlags.FF_MM) {
            $onBrowserInit()
        }
    }, [])

    return (
        <div>
            <h1>Hello</h1>
            <p>
                {JSON.stringify($metaMaskState)}
                <button onClick={doTheSwap}>Do the swap</button>
            </p>
        </div>
    )
}

export default SandboxPage
