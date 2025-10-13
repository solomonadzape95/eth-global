import { Button } from "./ui/button";

export default function Hero() {
    return <div className="max-w-6xl flex flex-col justify-start items-start border-2 w-full gap-10 pt-48 lg:pt-96">
        <h1 className="text-6xl xl:text-8xl font-bold">Lorem ipsum dolor sit.</h1>
        <p className="text-lg text-white/50">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit voluptatem iure voluptate dignissimos consectetur vero?</p>
        <section className="flex items-center flex-col lg:flex-row w-full lg:w-1/2 gap-3">
        <Button className="w-full" size="lg" variant="glassPrimary">
              Get Started
            </Button>
            <Button className="w-full" variant="glassLight" size="lg">View Docs</Button>
        </section>
        </div>
}