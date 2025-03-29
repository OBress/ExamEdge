"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PricingSection() {
  const [billingAnnually, setBillingAnnually] = useState(true)

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individual educators",
      priceMonthly: 9.99,
      priceAnnually: 7.99,
      features: [
        "Create up to 10 exams",
        "Basic question types",
        "Student performance tracking",
        "Email support",
        "1 admin user",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for departments and schools",
      priceMonthly: 24.99,
      priceAnnually: 19.99,
      features: [
        "Create unlimited exams",
        "All question types",
        "Advanced analytics",
        "Priority support",
        "Up to 5 admin users",
        "Custom branding",
        "Export results",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large institutions and organizations",
      priceMonthly: 49.99,
      priceAnnually: 39.99,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "API access",
        "SSO integration",
        "Unlimited admin users",
        "Custom feature development",
        "24/7 phone support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="mt-12">
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-toggle" className={billingAnnually ? "text-muted-foreground" : ""}>
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={billingAnnually} onCheckedChange={setBillingAnnually} />
          <Label htmlFor="billing-toggle" className={!billingAnnually ? "text-muted-foreground" : ""}>
            Annually <span className="text-xs text-primary">Save 20%</span>
          </Label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${billingAnnually ? plan.priceAnnually : plan.priceMonthly}</span>
                <span className="text-muted-foreground ml-1">/month</span>
                {billingAnnually && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed annually (${(plan.priceAnnually * 12).toFixed(2)}/year)
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${plan.popular ? "" : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"}`}
                variant={plan.popular ? "default" : "secondary"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

