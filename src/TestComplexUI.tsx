import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  AdaptiveDialog,
  AdaptiveDialogTrigger,
  AdaptiveDialogContent,
  AdaptiveDialogHeader,
  AdaptiveDialogTitle,
  AdaptiveDialogDescription,
  AdaptiveDialogFooter,
  AdaptiveDialogClose,
} from "@/components/ui/adaptive-dialog";
import { Slider } from "@/components/ui/slider";

export default function TestComplexUI() {
  const [value, setValue] = React.useState([50]);

  return (
    <div className="p-8 space-y-8 text-white">
      <h1 className="text-2xl font-bold">Complex UI Test</h1>

      <section>
        <h2 className="text-xl mb-4">Adaptive Dialog</h2>
        <AdaptiveDialog>
          <AdaptiveDialogTrigger asChild>
            <Button variant="outline">Open Dialog/Drawer</Button>
          </AdaptiveDialogTrigger>
          <AdaptiveDialogContent>
            <AdaptiveDialogHeader>
              <AdaptiveDialogTitle>Edit Profile</AdaptiveDialogTitle>
              <AdaptiveDialogDescription>
                Make changes to your profile here. Click save when you're done.
              </AdaptiveDialogDescription>
            </AdaptiveDialogHeader>
            <div className="py-4">
              <p>Content goes here...</p>
            </div>
            <AdaptiveDialogFooter>
              <AdaptiveDialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </AdaptiveDialogClose>
              <Button>Save changes</Button>
            </AdaptiveDialogFooter>
          </AdaptiveDialogContent>
        </AdaptiveDialog>
      </section>

      <section className="w-full max-w-sm">
        <h2 className="text-xl mb-4">Touch Slider</h2>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
        />
        <div className="mt-2">Value: {value}</div>
      </section>
    </div>
  );
}
