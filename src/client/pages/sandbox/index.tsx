import {ethers, BigNumber} from "ethers";
import {useAtomValue, useSetAtom} from "jotai";
import * as metaMaskModel from "../../app/models/metaMaskModel";
import {useEffect} from "react";
import * as featureFlagsModel from "../../app/models/featureFlagsModel";
import Button from "@mui/material/Button";

const bn1e18 = BigNumber.from(10).pow(18);

const SandboxPage = () => {
    const $featureFlags = useAtomValue(featureFlagsModel.$featureFlags)
    const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
    const $onBrowserInit = useSetAtom(metaMaskModel.$onBrowserInit)

    const doTheSwap = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const erc20Abi = [
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
        const erc1155Abi = [
            // Some details about the token
            "function balanceOf(address account, uint256 id) public view virtual override returns (uint256)",
        ];
        const managerAbi = [
            "function investUsingUsdt(uint256 amountToBuy) public",
        ];

        const address = {
            p1Token: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
            usdtfToken: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
            manager: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
        }


        //
        // const p1Token = new ethers.Contract(address.p1Token, erc20Abi, provider);
        // const p1TokenSigned = p1Token.connect(provider.getSigner())
        //
        // const p1TokenBalance = await p1TokenSigned.balanceOf(address.manager)
        // console.log('p1TokenBalance', p1TokenBalance.toString())
        //
        // //
        // const usdtfToken = new ethers.Contract(address.usdtfToken, erc20Abi, provider);
        // const usdtfTokenSigned = usdtfToken.connect(provider.getSigner())
        //
        // const amount = BigNumber.from(50).mul(bn1e18)
        //
        // const approve = await usdtfTokenSigned.approve(address.manager, amount.toString())
        // console.log('approve', approve)
        //
        // //
        // const manager = new ethers.Contract(address.manager, managerAbi, provider);
        // const managerSigned = manager.connect(provider.getSigner())
        //
        // const investUsingUsdt = await managerSigned.investUsingUsdt(amount.toString())
        // console.log('investUsingUsdt', investUsingUsdt)

        //
        const m1155 = new ethers.Contract('0x0165878A594ca255338adfa4d48449f69242Eb8F', erc1155Abi, provider);
        const m1155Signed = m1155.connect(provider.getSigner())

        const balance = await m1155Signed.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 2)
        console.log('balance', balance.toString())
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
            </p>
            <Button variant="contained" disableElevation onClick={doTheSwap}>
                Do the swap
            </Button>
        </div>
    )
}

export default SandboxPage
