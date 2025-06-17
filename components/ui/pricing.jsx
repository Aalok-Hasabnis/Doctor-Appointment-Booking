import React from 'react'
import { Card, CardContent } from './card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
    <Card className="border-emerald-900/30 shadow-lg bg-gradient-to-bl from emerald-950/30 to-transparent">
        <CardContent className="p-6 md:p-8 flex justify-between space-x-2">
            <PricingTable checkoutProps={{
                appearance:{
                    elements:{
                        drawerRoot:{
                            zIndex: 200,
                        },
                    },
                },
            }}/>
        </CardContent>
    </Card>
  )
}

export default Pricing