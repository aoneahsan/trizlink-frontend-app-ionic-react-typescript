/**
 * Core Imports go down
 * ? Like Import of React is a Core Import
 * */
import React from 'react';

/**
 * Packages Imports go down
 * ? Like import of ionic components is a packages import
 * */
import ReactPlayer, { Config } from 'react-player';
import { OnProgressProps, SourceProps } from 'react-player/base';

/**
 * Custom Imports go down
 * ? Like import of custom components is a custom import
 * */

/**
 * Global Constants Imports go down
 * ? Like import of Constant is a global constants import
 * */

/**
 * Type Imports go down
 * ? Like import of type or type of some recoil state or any external type import is a Type import
 * */

/**
 * Recoil State Imports go down
 * ? Import of recoil states is a Recoil State import
 * */

/**
 * Style files Imports go down
 * ? Import of style sheet is a style import
 * */

/**
 * Images Imports go down
 * ? Import of images like png,jpg,jpeg,gif,svg etc. is a Images Imports import
 * */

/**
 * Component props type go down
 * ? Like if you have a type for props it should be please Down
 * */
interface ZReactMediaPlayerInterface {
  playerProps: {
    url?: string | string[] | SourceProps[] | MediaStream;
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    light?: boolean;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    stopOnUnmount?: boolean;
    fallback?: React.ReactElement<
      unknown,
      string | React.JSXElementConstructor<unknown>
    >;
    playIcon?: React.ReactElement<
      unknown,
      string | React.JSXElementConstructor<unknown>
    >;
    previewTabIndex?: number | null;
    config?: Config;
    onPlaybackRateChange?: boolean;
    wrapper?: React.ComponentType<{
      children: React.ReactNode;
    }>;
    onReady?: (player: ReactPlayer) => void;
    onStart?: () => void;
    onPlay?: () => void;
    onProgress?: (state: OnProgressProps) => void;
    onDuration?: (duration: number) => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onBufferEnd?: () => void;
    onSeek?: (seconds: number) => void;
    onEnded?: () => void;
    onError?: (
      error: unknown,
      data?: unknown,
      hlsInstance?: unknown,
      hlsGlobal?: unknown
    ) => void;
    onClickPreview?: (event: unknown) => void;
    onEnablePIP?: () => void;
    onDisablePIP?: () => void;
  };
  mediaType: 'video' | 'audio';
}

/**
 * Functional Component
 * About: (Info of component here...)
 * @type {*}
 * */

const ZReactMediaPlayer: React.FC<ZReactMediaPlayerInterface> = (props) => {
  return <ReactPlayer {...props.playerProps} />;
};

export default ZReactMediaPlayer;
