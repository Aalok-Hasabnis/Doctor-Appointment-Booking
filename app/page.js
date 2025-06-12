import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { features } from "@/lib/data";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32"> 
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium">
                HealthCare Made Simple
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with Doctors <br /> <span className="gradient-title">anytime, anywhere</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
              Book appointments with top doctors in seconds. Get expert consultations from the comfort of your home — 24/7, wherever you are.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link href={'/onboarding'}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="border-e-emerald-700/30 hover:bg-muted/80">
                  <Link href={'/doctors'}>
                  Find Doctors </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image src="/Banner1.png" alt="Doctor Consultation" fill priority className="object-cover md:pt-14 rounded-xl"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our Platform makes healthCare Accessible with just few clicks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => {
            return (
              <Card key={index} className="border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"> 
                <CardHeader className="pb-2">
                  <div> {feature.icon}</div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}
