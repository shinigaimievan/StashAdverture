import adventure from '../../assets/images/adventure.png'
import title from '../../assets/images/adventure_txt.png'
import mountain from '../../assets/images/mountain.png'
import explore from '../../assets/images/exploration.png'
import { MULTIADVENTURE_CONTRACT } from '../../constants'
import useRarity from '../../hooks/useRarity'
import { useCallback, useEffect, useState } from 'react'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useUserSummoners } from '../../state/user/hooks'
import useMultiAdventure from '../../hooks/useMultiAdventure'
import { Summoner } from '../../state/user/actions'
import SummonerAdventureCard from '../../components/Summoner/Adventure'

export default function Adventure(): JSX.Element | null {
    const { library, chainId, account } = useActiveWeb3React()

    const summoners = useUserSummoners()

    const { nextAdventure, allowance, approve } = useRarity()

    const [multiadv, setMultiAdv] = useState<{
        approved: boolean
        available: boolean
        summoners: string[]
    }>({ approved: false, available: false, summoners: [] })

    async function approveMultiAdventure() {
        if (!chainId) return
        await approve(MULTIADVENTURE_CONTRACT[chainId])
    }

    const { at } = useMultiAdventure()

    async function sendMultiAdventure() {
        await at(multiadv.summoners)
    }

    const filter = useCallback(async () => {
        if (!chainId) return
        const allowed = await allowance(account, MULTIADVENTURE_CONTRACT[chainId])
        const filtered = []
        for (const summoner of summoners) {
            const nextAdv = await nextAdventure(summoner.id)
            const nextAdvTimestamp = parseInt(nextAdv.toString())
            if (nextAdvTimestamp * 1000 < Date.now()) {
                filtered.push(summoner)
            }
        }
        setMultiAdv({
            approved: allowed,
            available: filtered.length > 0,
            summoners: filtered.map((s: Summoner) => {
                return s.id
            }),
        })
    }, [summoners, nextAdventure, allowance, account, chainId])

    useEffect(() => {
        if (!account || !library) return
        filter()
    }, [filter, account, library])

    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={adventure} className="mx-auto w-16 mt-24 md:w-32" />
                <img alt="sword" src={title} className="mx-auto w-52 mt-4 md:w-1/3" />
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <img alt="sword" src={mountain} className="mx-auto w-64 -m-32" />
                <img alt="sword" src={explore} className="mx-auto w-64 mt-32 md:w-1/3 mb-8" />
                <span className="text-md md:text-2xl text-white mb-14">Journey Awaiting</span>
                <p className="w-full text-xl text-white my-4">Send all summoners to adventure</p>
                {multiadv.available ? (
                    multiadv.approved ? (
                        <button
                            className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4"
                            onClick={async () => {
                                await sendMultiAdventure()
                            }}
                        >
                            Adventure time!
                        </button>
                    ) : (
                        <button
                            className="bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4"
                            onClick={async () => {
                                await approveMultiAdventure()
                            }}
                        >
                            Approve
                        </button>
                    )
                ) : (
                    <button className="opacity-50 cursor-not-allowed bg-custom-green border-8 border-white p-4 rounded-lg text-xl text-white my-4">
                        No summoner available
                    </button>
                )}

                {summoners ? (
                    summoners.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-10/12 mx-auto mt-10 gap-4">
                            {summoners.map((summoner) => {
                                return <SummonerAdventureCard key={summoner.id} summoner={summoner} />
                            })}
                        </div>
                    ) : (
                        <p className="text-white mt-10 text-2xl font-bold">
                            To be able to manage stats you need to have a summoner
                        </p>
                    )
                ) : (
                    <div />
                )}
            </div>
        </>
    )
}
