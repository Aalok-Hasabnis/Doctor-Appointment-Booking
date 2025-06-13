import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Stethoscope } from "lucide-react";
import Link from "next/link";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { Card, CardHeader, CardContent, CardTitle, CardAction } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32"> 
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium mb-4">
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
        </div>
      </section>

      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium mb-4">
                HealthCare Made Simple
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Consultation Packages</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation packages according to your requirement.
            </p>
          </div>
            <div>
              {/*princing component */}
              <Card className="mt-12 bg-muted/20 border-emerald-900/30">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <Stethoscope className="h-5 w-5 mr-2 text-emerald-400"/>
                    How our credit system Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                  {creditBenefits.map((benefit, index) => {
                    return (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                          <Check className="h-4 w-4 text-emerald-400"/>
                        </div>
                          <p className="text-muted-foreground" dangerouslySetInnerHTML={{__html: benefit}} />
                      </li>
                    )
                  })}
                  </ul>
                </CardContent>
              </Card>
            </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium mb-4"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear directly from patients and doctors who use our platform every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300 bg-background shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                      <span className="text-emerald-400 font-bold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">“{testimonial.quote}”</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 animate-pulse"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Card className="bg-gradient-to-br from-emerald-900/40 via-emerald-950/30 to-teal-950/20 border border-emerald-700/50 shadow-2xl rounded-3xl backdrop-blur-sm hover:shadow-emerald-500/10 transition-all duration-500">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent rounded-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 leading-tight bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-emerald-100/80 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                  Join thousands who've ditched the waiting rooms. Book, consult, and heal — all from your couch, even in pajamas. Health just got personal.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-emerald-400/70 text-emerald-300 hover:bg-emerald-400 hover:text-emerald-900 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/25 backdrop-blur-sm">
                    <Link href="/sign-up">Sign-Up</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105">
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
