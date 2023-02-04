import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Video } from "../types";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { IoIosMusicalNotes } from "react-icons/io";

interface IProps {
  post: Video;
}

const VideoCard = ({ post }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const username = post.postedBy.userName.concat().toLowerCase();

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary truncate">
                    {post.postedBy.userName}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block truncate">
                    {post.postedBy.userName}
                  </p>
                </div>
                <p className="flex items-center text-sm gap-2 truncate">
                  <IoIosMusicalNotes /> original sound -
                  <span className="hover:underline">
                    {post.postedBy.userName}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <Link href="/">
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="lg:w-[302px] h-[300px] md:h-[302px] lg:h-[530px] w-[172px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 lg:left-20 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
              {playing ? (
                <button>
                  <BsFillPauseFill
                    onClick={onVideoPress}
                    className="text-white text-2xl lg:text-4xl"
                  />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill
                    onClick={onVideoPress}
                    className="text-white text-2xl lg:text-4xl"
                  />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
