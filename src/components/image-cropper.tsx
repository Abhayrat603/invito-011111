
"use client"

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import getCroppedImg from '@/lib/crop-image';
import type { Area } from 'react-easy-crop';
import { Crop } from 'lucide-react';

interface ImageCropperProps {
  image: File;
  onCropComplete: (croppedImage: Blob) => void;
  onClose: () => void;
  isOpen: boolean;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onClose, isOpen }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const imageSrc = React.useMemo(() => URL.createObjectURL(image), [image]);

  const onCropChange = useCallback((location: { x: number; y: number; }) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const onCropCompleteCallback = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        onCropComplete(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Crop/> Crop Your Photo</DialogTitle>
        </DialogHeader>
        <div className="relative h-80 w-full bg-muted rounded-md">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={(zoom) => setZoom(zoom)}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <div className="space-y-2">
            <label className="text-sm font-medium">Zoom</label>
            <Slider
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={onZoomChange}
            />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCrop}>Save Picture</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
