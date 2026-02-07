import Image from "next/image";

export default function LayoutFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl flex flex-col justify-center md:flex-row md:justify-between gap-6 px-6 py-8">
        <div className="flex flex-col gap-2 items-center md:flex-row md:gap-6">
          <Image
            src="/images/logo.svg"
            alt="DadaLab logo"
            width={140}
            height={32}
            className="grayscale opacity-75"
          />
          <div className="">
            <dl className="flex items-center gap-2 text-sm text-gray-400">
              <dt>Email: </dt>
              <dd className="text-gray-600">dada4dev@gmail.com</dd>
            </dl>
          </div>
        </div>
        <p className="text-sm content-center text-gray-400 text-center md:text-left">
          &copy; 2026 DadaLab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
