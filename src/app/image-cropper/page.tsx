
"use client";

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/main-layout';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Upload, RotateCw, Crop } from 'lucide-react';
import { useRouter } from 'next/navigation';

// A utility function to create a downloadable image from cropped area
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(imageSrc: string, pixelCrop: any, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotation and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As a blob
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((file) => {
        if (file) {
            resolve(URL.createObjectURL(file));
        } else {
            reject(new Error('Canvas is empty'));
        }
    }, 'image/jpeg');
  });
}

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export default function ImageCropperPage() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          rotation
        );
        console.log('donee', { croppedImage });
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
    }
  };

  const handleBack = () => {
    if (croppedImage) {
      setCroppedImage(null);
      setImageSrc(null);
    } else if (imageSrc) {
      setImageSrc(null);
    } else {
      router.back();
    }
  };

  if (croppedImage) {
    return (
      <MainLayout>
        <div className="flex flex-col h-full">
            <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10 shrink-0">
                <Button variant="ghost" size="icon" onClick={handleBack}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold text-center flex-grow">Cropped Image</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-grow p-4 flex flex-col items-center justify-center">
                 <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
                 <Button onClick={handleBack} className="mt-4">Start Over</Button>
            </main>
        </div>
      </MainLayout>
    );
  }

  if (imageSrc) {
    return (
        <MainLayout>
             <div className="flex flex-col h-full">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10 shrink-0">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Crop Your Image</h1>
                    <div className="w-10"></div>
                </header>
                <div className="relative flex-grow">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                    />
                </div>
                 <div className="p-4 space-y-4 bg-background border-t">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Zoom</label>
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Rotation</label>
                        <Slider
                            value={[rotation]}
                            min={0}
                            max={360}
                            step={1}
                            onValueChange={(value) => setRotation(value[0])}
                        />
                    </div>
                    <Button onClick={showCroppedImage} className="w-full">
                        <Crop className="mr-2 h-4 w-4" />
                        Show Cropped Image
                    </Button>
                </div>
            </div>
        </MainLayout>
    );
  }

  return (
    <MainLayout>
        <div className="flex flex-col h-full">
             <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-xl font-bold text-center flex-grow">Image Cropper</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-grow p-4 flex items-center justify-center">
                <div className="text-center">
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="mb-4 flex justify-center">
                            <div className="bg-primary/10 p-6 rounded-full">
                                <Upload className="h-12 w-12 text-primary" />
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">Upload an Image</h2>
                        <p className="text-muted-foreground mt-1">Click here to select a file from your device.</p>
                    </label>
                    <input id="file-upload" type="file" onChange={onFileChange} accept="image/*" className="hidden" />
                </div>
            </main>
        </div>
    </MainLayout>
  );
}

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
