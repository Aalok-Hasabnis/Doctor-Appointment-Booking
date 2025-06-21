import { getCurrentUser } from '@/actions/onboarding';
import { redirect } from 'next/navigation';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ClipboardCheck, XCircle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const VerificationPage = async () => {
  const user = await getCurrentUser();

  if (user?.verificationStatus === "VERIFIED") {
    redirect("/doctor");
  }

  const isRejected = user?.verificationStatus === "REJECTED";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900/10 via-background to-emerald-900/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              Doctor Verification
            </h1>
            <p className="text-muted-foreground text-lg">
              Your journey to helping patients begins here
            </p>
          </div>

          <Card className="border-emerald-900/30 bg-card/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div
                className={`mx-auto p-6 ${
                  isRejected 
                    ? "bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/30" 
                    : "bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/30"
                } rounded-2xl mb-6 w-fit shadow-lg`}
              >
                {isRejected ? (
                  <XCircle className="h-12 w-12 text-red-400" />
                ) : (
                  <div className="relative">
                    <ClipboardCheck className="h-12 w-12 text-amber-400" />
                    <div className="absolute -top-1 -right-1">
                      <Clock className="h-5 w-5 text-amber-300 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {isRejected ? "Verification Declined" : "Verification in Progress"}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {isRejected
                  ? "Your application requires some adjustments before approval."
                  : "We're carefully reviewing your credentials and information."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Status Card */}
              {isRejected ? (
                <div className="relative overflow-hidden bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-800/40 p-8 rounded-2xl shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 p-3 bg-red-900/40 rounded-xl">
                      <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-red-400 mb-3">
                        Action Required
                      </h3>
                      <p className="text-white mb-4 leading-relaxed">
                        Your verification was declined due to missing or invalid documentation.
                        Please review your credential links and ensure all submitted details are accurate.
                      </p>
                      <div className="bg-red-900/20 border border-red-800/30 p-4 rounded-lg">
                        <p className="text-sm text-red-200 font-medium mb-2">
                          📋 Next Steps:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You can resubmit your application from the onboarding page once your documentation is ready.
                          Our support team is available to help if you have any questions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-950/40 to-amber-900/20 border border-amber-800/40 p-8 rounded-2xl shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative flex items-start gap-6">
                    <div className="flex-shrink-0 p-3 bg-amber-900/40 rounded-xl">
                      <ClipboardCheck className="h-8 w-8 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-amber-400 mb-3">
                        Under Review
                      </h3>
                      <p className="text-white mb-4 leading-relaxed">
                        Our medical verification team is carefully reviewing your credentials and professional information.
                        This process typically takes 2-3 business days.
                      </p>
                      <div className="bg-amber-900/20 border border-amber-800/30 p-4 rounded-lg">
                        <p className="text-sm text-amber-200 font-medium mb-2">
                          ⏰ What happens next:
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You'll receive an email notification as soon as your verification is complete.
                          Once approved, you'll have full access to your doctor dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Steps */}
              <div className="bg-emerald-950/30 border border-emerald-800/30 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Verification Process
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm text-white">Application submitted successfully</span>
                  </div>
                  <div className={`flex items-center gap-3 ${!isRejected ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`h-5 w-5 rounded-full border-2 ${!isRejected ? 'border-amber-400 bg-amber-400/20' : 'border-gray-600'} flex items-center justify-center`}>
                      {!isRejected && <div className="h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>}
                    </div>
                    <span className="text-sm text-white">Credentials under review</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="h-5 w-5 rounded-full border-2 border-gray-600"></div>
                    <span className="text-sm text-muted-foreground">Profile activation</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-emerald-700/50 hover:border-emerald-600 hover:bg-emerald-900/20 text-emerald-300 hover:text-emerald-200 transition-all duration-200"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Home
                  </Link>
                </Button>
                
                {isRejected && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg transition-all duration-200"
                  >
                    <Link href="/onboarding" className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Resubmit Application
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer Message */}
          <div className="text-center mt-8 p-6 bg-emerald-950/20 border border-emerald-800/20 rounded-xl">
            <p className="text-sm text-muted-foreground">
              Questions about the verification process? 
              <Link href="/support" className="text-emerald-400 hover:text-emerald-300 ml-1 underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
