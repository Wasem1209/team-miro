import React from "react";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className=" text-[#000000CC] w-[80%] mx-auto mt-[60px] mb-[40px]">
      <div className="flex flex-col mx-auto gap-[5px] [@media(min-width:547px)]:gap-[16px]">
        {/* Upper part of footer */}
        <div className="flex flex-col gap-[1px] [@media(min-width:547px)]:flex-row gap-[32px]">
          {/* Logo text and description */}
          <div className="flex flex-col gap-[16px] w-[280px]">
            <div>
              <h1 className="text-[#212121] leading-[32px] text-[24px]">
                DriveEasy
              </h1>
            </div>
            <div>
              <p className="text-[16px] leading-[24px] font-normal">
                Making car rentals simple, secure and accessible for everyone.
              </p>
            </div>
            <div className="flex flex-row ">
              <div>
                <SocialIcon
                  url="https://facebook.com"
                  style={{ height: 20, width: 20 }}
                />
              </div>
              <div className="pl-[20px]">
                <SocialIcon
                  url="https://x.com"
                  style={{ height: 20, width: 20 }}
                />
              </div>
              <div className="pl-[16px]">
                <SocialIcon
                  url="https://instagram.com"
                  style={{ height: 20, width: 20 }}
                />
              </div>
            </div>
          </div>

          {/*Quick Links */}
          <div className="flex flex-col gap-[16px] w-[280px]  h-[164px] ">
            <h4 className="text-[#212121] text-[18px] leading- [28px]">
              Quick Links
            </h4>
            <div className="flex flex-col gap-[8px]">
              <a href="#" className="leading-[24px]">
                Browse Cars
              </a>
              <a href="#" className="leading-[24px]">
                My Bookings
              </a>
              <a href="#" className="leading-[24px]">
                Payment Methods
              </a>
              <a href="#" className="leading-[24px]">
                Loyalty Program
              </a>
            </div>
          </div>

          {/*Support */}
          <div className="flex flex-col gap-[16px] w-[280px]  h-[164px] ">
            <h4 className="text-[#212121] text-[18px] leading- [28px]">
              Support
            </h4>
            <div className="flex flex-col gap-[8px]">
              <a href="#" className="leading-[24px]">
                Help Center
              </a>
              <a href="#" className="leading-[24px]">
                Contact Us
              </a>
              <a href="#" className="leading-[24px]">
                About Us
              </a>
              <a href="#" className="leading-[24px]">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="flex flex-col gap-[16px] w-[280px]  h-[50px]  [@media(min-width:547px)]:h-[164px]">
            <div className="h-[88px] my-auto">
              <a href="#" className="leading-[24px]">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/*Lower part of footer */}
        <div className="flex items-start justify-center h-[57px] border-t-[0.5px] border-[#000000CC] [@media(min-width:547px)]:items-end">
          <div>
            <p className="leading-[24px] text-[#000000CC]">
              © 2025 DriveEasy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
