import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

interface AdaptiveDialogProps extends React.ComponentProps<typeof Dialog> {
  children: React.ReactNode;
}

const AdaptiveDialogContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

export function AdaptiveDialog({ children, ...props }: AdaptiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AdaptiveDialogContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <Dialog {...props}>{children}</Dialog>
      ) : (
        <Drawer {...props}>{children}</Drawer>
      )}
    </AdaptiveDialogContext.Provider>
  );
}

export function AdaptiveDialogTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DialogTrigger>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogTrigger className={className} {...props} />;
  }

  return <DrawerTrigger className={className} {...props} />;
}

export function AdaptiveDialogClose({
  className,
  ...props
}: React.ComponentProps<typeof DialogClose>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogClose className={className} {...props} />;
  }

  return <DrawerClose className={className} {...props} />;
}

export function AdaptiveDialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return (
      <DialogContent className={className} {...props}>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className={className} {...props}>
      {children}
    </DrawerContent>
  );
}

export function AdaptiveDialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof DialogHeader>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogHeader className={className} {...props} />;
  }

  return <DrawerHeader className={className} {...props} />;
}

export function AdaptiveDialogFooter({
  className,
  ...props
}: React.ComponentProps<typeof DialogFooter>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogFooter className={className} {...props} />;
  }

  return <DrawerFooter className={className} {...props} />;
}

export function AdaptiveDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitle>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogTitle className={className} {...props} />;
  }

  return <DrawerTitle className={className} {...props} />;
}

export function AdaptiveDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescription>) {
  const { isDesktop } = React.useContext(AdaptiveDialogContext);

  if (isDesktop) {
    return <DialogDescription className={className} {...props} />;
  }

  return <DrawerDescription className={className} {...props} />;
}
