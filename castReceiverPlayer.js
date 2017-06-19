/* Global Strict Mode */
"use strict";
var castReceiverPlayer = castReceiverPlayer || {};

/* Init querySelector var */
var attchedvideoClassName = '.video';
var overlayClassName = '.media-info-show-part';
var watermarkClassName = '.watermark';
var mediaInformationClassName = '.media-info';
var mediaTextClassName = '.media-tex';
var mediaArtworkClassName = '.media-artwork';
var mediaTitleClassName = '.media-title';
var mediaSubtitleClassName = '.media-subtitle';
var mediaArtWorkQueueClassName = '.media-artwork-queue-insert';
var mediaTitleQueueClassName = '.media-title-queue-insert';
var mediaSubtitleQueueClassName = '.media-subtitle-queue-insert';
var previewModeInformationClassName = '.preview-info';
var previewModeArtworkClassName = '.preview-artwork';
var previewModeTextClassName = '.preview-text';
var previewModeTimerClassName = '.preview-timer';
var previewModeTimerStartsClassName = '.preview-timer-starts';
var previewModeTimerCountdownClassName = '.preview-timer-countdown';
var previewModeTimerSecClassName = '.preview-timer-sec';
var previewModeTitleClassName = '.preview-title';
var previewModeSubtitleClassName = '.preview-subtitle';
var controlsClassName = '.controls';
var controlsPlayPauseClassName = '.controls-play-pause';
var controlsCurrentTimeClassName = '.controls-cur-time';
var controlsTotalTimeClassName = '.controls-total-time';
var controlsProgressClassName = '.controls-progress';
var controlsProgressInnerClassName = '.controls-progress-inner';
var controlsProgressThumbClassName = '.controls-progress-thumb';
/* (End) Init querySelector var */
/* Init Dom Element Artribute var */
var domElementArtributePreviewMode = 'preview';
var domElementArtributeType = 'type';
var domElementArtributeState = 'state';
var domElementArtributeLive = 'live';
/* (End) Init Dom Element Artribute var */

castReceiverPlayer.ChromecastPlayer = function (domElement) { //context this = castReceiverPlayer.ChromecastPlayer. @param {!Element} the DOM element to attach the player
    /* The debug setting to control receiver, MPL and player logging. castReceiverPlayer.DISABLE_DEBUG_ = true. castReceiverPlayer.ENABLE_DEBUG_ = false*/
    this.debug_ = castReceiverPlayer.ENABLE_DEBUG_;
    if (this.debug_) {
        cast.player.api.setLoggerLevel(cast.player.api.LoggerLevel.DEBUG);
        cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
    }

    this.domElement_ = domElement; //The DOM element the player is attached. @private {!Element}
    this.mediaType_; //The current type of the player. @private {castReceiverPlayer.Type}
    this.setMediaType_(castReceiverPlayer.Type.UNKNOWN, false);
    this.playerState_; //The current state of the player. @private {castReceiverPlayer.State}
    this.lastStateTransitionTime_ = 0; //Timestamp when state transition happened last time. @private {number}
    this.setPlayerState_(castReceiverPlayer.State.LAUNCHING, false);
    this.burnInPreventionIntervalId_; //The id returned by setInterval for the screen burn timer. @private {number|undefined}
    this.idleTimerId_; //The id returned by setTimeout for the idle timer. @private {number|undefined}
    this.curAppState_; //Current application state. @private {string|undefined}
    this.progressBarInnerElement_ = this.getElementByClass_(controlsProgressInnerClassName); // The DOM element for the inner portion of the progress bar. @private {!Element}
    this.progressBarThumbElement_ = this.getElementByClass_(controlsProgressThumbClassName); //The DOM element for the thumb portion of the progress bar. @private {!Element}
    this.curTimeElement_ = this.getElementByClass_(controlsCurrentTimeClassName); //The DOM element for the current time label. @private {!Element}
    this.totalTimeElement_ = this.getElementByClass_(controlsTotalTimeClassName); // The DOM element for the total time label. @private {!Element}
    this.previewModeTimerElement_ = this.getElementByClass_(previewModeTimerCountdownClassName); //The DOM element for the preview time label. @private {!Element}
    this.bufferingHandler_ = this.onBuffering_.bind(this); //Handler for buffering-related events for MediaElement. @private {function()}
    this.player_ = null; //Media player to play given manifest. @private {cast.player.api.Player}
    this.preloadPlayer_ = null; //Media player used to preload content. @private {cast.player.api.Player}
    this.textTrackType_ = null; //Text Tracks currently supported. @private {?castReceiverPlayer.TextTrackType}
    this.playerAutoPlay_ = false; //Whether player app should handle autoplay behavior. @private {boolean}
    this.displayPreviewMode_ = false; //Whether player app should display the preview mode UI. @private {boolean}
    this.deferredPlayCallbackId_ = null; //Id of deferred play callback. @private {?number}
    this.playerReady_ = false; //Whether the player is ready to receive messages after a LOAD request. @private {boolean}
    this.metadataLoaded_ = false; //Whether the player has received the metadata loaded event after a LOAD request. @private {boolean}
	this.loadedMediaInfor_ = null;
	this.loadedLiveDuration_ = Infinity;
	
    /* Add HTML Video Object event Listener by 'this' context function */
    /** @type {HTMLMediaElement} */
    this.mediaElement_ = (this.domElement_.querySelector(attchedvideoClassName)); //The media element. @private {HTMLMediaElement}
    this.mediaElement_.addEventListener('error', this.onError_.bind(this), false);
    this.mediaElement_.addEventListener('playing', this.onPlaying_.bind(this), false);
    this.mediaElement_.addEventListener('pause', this.onPause_.bind(this), false);
    this.mediaElement_.addEventListener('ended', this.onEnded_.bind(this), false);
    this.mediaElement_.addEventListener('abort', this.onAbort_.bind(this), false);
    this.mediaElement_.addEventListener('timeupdate', this.onProgress_.bind(this), false);
    this.mediaElement_.addEventListener('seeking', this.onSeekStart_.bind(this), false);
    this.mediaElement_.addEventListener('seeked', this.onSeekEnd_.bind(this), false);
    /* (End) Add HTML Video Object event Listener by 'this' context function */

    /* Get CastReceiverManager singleton object and bind event*/
    this.receiverManager_ = cast.receiver.CastReceiverManager.getInstance(); //The cast receiver manager. @private {!cast.receiver.CastReceiverManager}
    this.receiverManager_.onReady = this.onReady_.bind(this);
    /**this.receiverManager_.onSenderConnected = this.onSenderConnected_.bind(this);/**/
    this.receiverManager_.onSenderDisconnected = this.onSenderDisconnected_.bind(this);
    this.receiverManager_.onVisibilityChanged = this.onVisibilityChanged_.bind(this);
    this.receiverManager_.setApplicationState(castReceiverPlayer.getApplicationState_());
    /* (End) Get CastReceiverManager singleton object and bind event*/

    /* Init MediaManager*/
    /* https://developers.google.com/cast/docs/reference/receiver/cast.receiver.MediaManager */
    this.mediaManager_ = new cast.receiver.MediaManager(this.mediaElement_); //The remote media object. @private {cast.receiver.MediaManager}
    /* Media menager onLoad*/
    this.onLoadOrig_ = this.mediaManager_.onLoad.bind(this.mediaManager_); //The original load callback. @private {?function(cast.receiver.MediaManager.Event)}
    this.mediaManager_.onLoad = this.onLoad_.bind(this);
    /* (End) Media menager onLoad*/
    /* Media menager onEditTracksInfo*/
    this.onEditTracksInfoOrig_ = this.mediaManager_.onEditTracksInfo.bind(this.mediaManager_); //The original editTracksInfo callback. @private {?function(!cast.receiver.MediaManager.Event)}
    this.mediaManager_.onEditTracksInfo = this.onEditTracksInfo_.bind(this);
    /* (End) Media menager onEditTracksInfo*/
    /* Media menager onMetadataLoaded*/
    this.onMetadataLoadedOrig_ = this.mediaManager_.onMetadataLoaded.bind(this.mediaManager_); //The original metadataLoaded callback. @private {?function(!cast.receiver.MediaManager.LoadInfo)}
    this.mediaManager_.onMetadataLoaded = this.onMetadataLoaded_.bind(this);
    /* (End) Media menager onMetadataLoaded*/
    /* Media menager onStop*/
    this.onStopOrig_ = this.mediaManager_.onStop.bind(this.mediaManager_); //The original stop callback. @private {?function(cast.receiver.MediaManager.Event)}
    this.mediaManager_.onStop = this.onStop_.bind(this);
    /* (End) Media menager onStop*/
    /* Media menager onLoadMetadataError*/
    this.onLoadMetadataErrorOrig_ = this.mediaManager_.onLoadMetadataError.bind(this.mediaManager_); //The original metadata error callback. @private {?function(!cast.receiver.MediaManager.LoadInfo)}
    this.mediaManager_.onLoadMetadataError = this.onLoadMetadataError_.bind(this);
    /* (End) Media menager onLoadMetadataError*/
    /* Media menager onError*/
    this.onErrorOrig_ = this.mediaManager_.onError.bind(this.mediaManager_); //The original error callback. @private {?function(!Object)}
    this.mediaManager_.onError = this.onError_.bind(this);
    /* (End) Media menager onError*/
    /* Media Queue evnet */
    this.onQueueEndedOrig_ = this.mediaManager_.onQueueEnded.bind(this.mediaManager_);
    this.mediaManager_.onQueueEnded = this.onQueueEnded_.bind(this);
    this.onQueueInsertOrig_ = this.mediaManager_.onQueueInsert.bind(this.mediaManager_);
    this.mediaManager_.onQueueInsert = this.onQueueInsert_.bind(this);
    this.onQueueLoadOrig_ = this.mediaManager_.onQueueLoad.bind(this.mediaManager_);
    this.mediaManager_.onQueueLoad = this.onQueueLoad_.bind(this);
    this.onQueueRemoveOrig_ = this.mediaManager_.onQueueRemove.bind(this.mediaManager_);
    this.mediaManager_.onQueueRemove = this.onQueueRemove_.bind(this);
    this.onQueueReorderOrig_ = this.mediaManager_.onQueueReorder.bind(this.mediaManager_);
    this.mediaManager_.onQueueReorder = this.onQueueReorder_.bind(this);
    this.onQueueUpdateOrig_ = this.mediaManager_.onQueueUpdate.bind(this.mediaManager_);
    this.mediaManager_.onQueueUpdate = this.onQueueUpdate_.bind(this);
    /* (End) Media Queue evnet */

    this.mediaManager_.customizedStatusCallback = this.customizedStatusCallback_.bind(this);
    this.mediaManager_.onPreload = this.onPreload_.bind(this);
    this.mediaManager_.onCancelPreload = this.onCancelPreload_.bind(this);
    /* (End)Init MediaManager*/
};

castReceiverPlayer.ChromecastPlayer.prototype.getMediaElement = function () {
    return this.mediaElement_;
};
castReceiverPlayer.ChromecastPlayer.prototype.getMediaManager = function () {
    return this.mediaManager_;
};
castReceiverPlayer.ChromecastPlayer.prototype.getPlayer = function () {
    return this.player_;
};
castReceiverPlayer.ChromecastPlayer.prototype.start = function () {
    this.receiverManager_.start();
};

/* function bound with video event*/
castReceiverPlayer.ChromecastPlayer.prototype.onError_ = function (error) { //@see cast.receiver.MediaManager#onError. @param {!Object} error
    console.log('Player Event --- onError');
    var self = this;
    castReceiverPlayer.transition_(self.domElement_, castReceiverPlayer.TRANSITION_DURATION_,
        function () {
            self.setPlayerState_(castReceiverPlayer.State.IDLE, false);
            self.onErrorOrig_(error);
        });
};
castReceiverPlayer.ChromecastPlayer.prototype.onPlaying_ = function () {
    console.log('Player Event --- onEvent');
    this.cancelDeferredPlay_('media is already playing');
    var isAudio = this.mediaType_ == castReceiverPlayer.Type.AUDIO;
    var isLoading = this.playerState_ == castReceiverPlayer.State.LOADING;
    var crossfade = isLoading && !isAudio;
    this.setPlayerState_(castReceiverPlayer.State.PLAYING, crossfade);
};
castReceiverPlayer.ChromecastPlayer.prototype.onPause_ = function () {
    console.log('Player Event --- onPause');
    this.cancelDeferredPlay_('media is paused');
    var isIdle = this.playerState_ === castReceiverPlayer.State.IDLE;
    var isDone = this.mediaElement_.currentTime === this.mediaElement_.duration;
    var isUnderflow = this.player_ && this.player_.getState()['underflow'];
    if (isUnderflow) {
        console.log('isUnderflow');
        this.setPlayerState_(castReceiverPlayer.State.BUFFERING, false);
        this.mediaManager_.broadcastStatus(false);
    } else if (!isIdle && !isDone) {
        this.setPlayerState_(castReceiverPlayer.State.PAUSED, false);
    }
    this.updateProgress_();
};
castReceiverPlayer.ChromecastPlayer.prototype.onEnded_ = function () {
    console.log('Player Event --- onEnded');
    this.setPlayerState_(castReceiverPlayer.State.IDLE, true);
    this.hidePreviewMode_();
};
castReceiverPlayer.ChromecastPlayer.prototype.onAbort_ = function () {
    console.log('Player Event --- onAbort');
    this.setPlayerState_(castReceiverPlayer.State.IDLE, true);
    this.hidePreviewMode_();
};
castReceiverPlayer.ChromecastPlayer.prototype.onProgress_ = function () {
    console.log('Player Event --- onProgress');
    if (this.playerState_ === castReceiverPlayer.State.BUFFERING ||
        this.playerState_ === castReceiverPlayer.State.LOADING) {
        this.setPlayerState_(castReceiverPlayer.State.PLAYING, false);
    }
    this.updateProgress_();
};
castReceiverPlayer.ChromecastPlayer.prototype.onSeekStart_ = function () {
    console.log('Player Event --- onSeekStart');
    clearTimeout(this.seekingTimeoutId_);
    this.domElement_.classList.add('seeking');
};
castReceiverPlayer.ChromecastPlayer.prototype.onSeekEnd_ = function () {
    console.log('Player Event --- onSeekEnd');
    clearTimeout(this.seekingTimeoutId_);
    this.seekingTimeoutId_ = castReceiverPlayer.addClassWithTimeout_(this.domElement_, 'seeking', 100);
};
/* (End) function bound with video event*/

/* function bound with CastReceiverManager event*/
castReceiverPlayer.ChromecastPlayer.prototype.onReady_ = function () {
    console.log('CastReceiverManager --- onReady');
    this.setPlayerState_(castReceiverPlayer.State.IDLE, false);
};
castReceiverPlayer.ChromecastPlayer.prototype.onSenderDisconnected_ = function (event) {//@param {cast.receiver.CastReceiverManager.SenderDisconnectedEvent} event
    console.log('CastReceiverManager --- onSenderDisconnected');
    console.log('onSenderDisconnected: Event --- ' + JSON.stringify(event));
    if (this.receiverManager_.getSenders().length === 0 && event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) { // When the last or only sender is connected to a receiver, tapping Disconnect stops the app running on the receiver.
        this.receiverManager_.stop();
    }
    console.log(' (End) CastReceiverManager --- onSenderDisconnected');
};
castReceiverPlayer.ChromecastPlayer.prototype.onVisibilityChanged_ = function (event) {// @param {!cast.receiver.CastReceiverManager.VisibilityChangedEvent} event Event fired when visibility of application is changed.
    console.log('CastReceiverManager --- onVisibilityChanged');
    if (!event.isVisible) {
        this.mediaElement_.pause();
        this.mediaManager_.broadcastStatus(false);
    }
};
//@return {string} The application state.
castReceiverPlayer.getApplicationState_ = function (opt_media) {//@param {cast.receiver.media.MediaInformation=} opt_media The current media metadata
    if (opt_media && opt_media.metadata && opt_media.metadata.title) {
        return 'Now Casting: ' + opt_media.metadata.title;
    } else if (opt_media) {
        return 'Now Casting';
    } else {
        return 'Ready To Cast';
    }
};
/* (End) function bound with CastReceiverManager event*/

/* function bound with MediaManager event*/
castReceiverPlayer.ChromecastPlayer.prototype.onLoad_ = function (event) {//@see castReceiverPlayer#load. @param {cast.receiver.MediaManager.Event} event The load event.
    console.log('MediaManager Event --- onLoad');
    console.log('onLoad --- event: ' + JSON.stringify(event));
	this.loadedMediaInfor_ = event;
	this.loadedLiveDuration_ = event.data.media.duration;
	console.log('loadedLiveDuration_ = ' + this.loadedLiveDuration_);
    this.cancelDeferredPlay_('new media is loaded');
    this.load(new cast.receiver.MediaManager.LoadInfo(/** @type {!cast.receiver.MediaManager.LoadRequestData} */ (event.data), event.senderId));
    console.log(' (End) MediaManager Event --- onLoad');
};
castReceiverPlayer.ChromecastPlayer.prototype.onEditTracksInfo_ = function (event) {//@param {!cast.receiver.MediaManager.Event} event The editTracksInfo event.
    console.log('MediaManager Event --- onEditTracksInfo');
    this.onEditTracksInfoOrig_(event);
    // If the captions are embedded or ttml we need to enable/disable tracks
    // as needed (vtt is processed by the media manager)
    if (!event.data || !event.data.activeTrackIds || !this.textTrackType_) {
        return;
    }
    var mediaInformation = this.mediaManager_.getMediaInformation() || {};
    var type = this.textTrackType_;
    if (type == castReceiverPlayer.TextTrackType.SIDE_LOADED_TTML) {
        // The player_ may not have been created yet if the type of media did
        // not require MPL. It will be lazily created in processTtmlCues_
        if (this.player_) {
            this.player_.enableCaptions(false, cast.player.api.CaptionsType.TTML);
        }
        this.processTtmlCues_(event.data.activeTrackIds,
            mediaInformation.tracks || []);
    } else if (type == castReceiverPlayer.TextTrackType.EMBEDDED) {
        this.player_.enableCaptions(false);
        this.processInBandTracks_(event.data.activeTrackIds);
        this.player_.enableCaptions(true);
    }
};
castReceiverPlayer.ChromecastPlayer.prototype.onMetadataLoaded_ = function (info) {//@param {!cast.receiver.MediaManager.LoadInfo} info The load information.
    console.log('MediaManager Event ---  onMetadataLoaded');
    this.onLoadSuccess_();
    // In the case of ttml and embedded captions we need to load the cues using MPL.
    this.readSideLoadedTextTrackType_(info);

    if (this.textTrackType_ ==
        castReceiverPlayer.TextTrackType.SIDE_LOADED_TTML &&
        info.message && info.message.activeTrackIds && info.message.media &&
        info.message.media.tracks) {
        this.processTtmlCues_(
            info.message.activeTrackIds, info.message.media.tracks);
    } else if (!this.textTrackType_) {
        // If we do not have a textTrackType, check if the tracks are embedded
        this.maybeLoadEmbeddedTracksMetadata_(info);
    }
    // Only send load completed when we have completed the player LOADING state
    this.metadataLoaded_ = true;
    this.maybeSendLoadCompleted_(info);
    console.log(' (End) MediaManager Event ---  onMetadataLoaded');
};
castReceiverPlayer.ChromecastPlayer.prototype.onStop_ = function (event) { //@param {cast.receiver.MediaManager.Event} event The stop event.
    console.log('MediaManager Event --- onStop');
    this.cancelDeferredPlay_('media is stopped');
    var self = this;
    castReceiverPlayer.transition_(self.domElement_, castReceiverPlayer.TRANSITION_DURATION_,
        function () {
            self.setPlayerState_(castReceiverPlayer.State.IDLE, false);
            self.onStopOrig_(event);
        });
};
castReceiverPlayer.ChromecastPlayer.prototype.onLoadMetadataError_ = function (event) {//@see cast.receiver.MediaManager#onLoadMetadataError. * @param {!cast.receiver.MediaManager.LoadInfo} event The data associated with a LOAD event.
    console.log('MediaManager Event --- onLoadMetadataError_');
    var self = this;
    castReceiverPlayer.transition_(self.domElement_, castReceiverPlayer.TRANSITION_DURATION_,
        function () {
            self.setPlayerState_(castReceiverPlayer.State.IDLE, false);
            self.onLoadMetadataErrorOrig_(event);
        });
};
//@return {cast.receiver.media.MediaStatus} MediaStatus that will be sent to sender.
castReceiverPlayer.ChromecastPlayer.prototype.customizedStatusCallback_ = function (mediaStatus) {//@param {!cast.receiver.media.MediaStatus} mediaStatus Media status that is supposed to go to sender.
    console.log('customizedStatusCallback_: playerState=' + mediaStatus.playerState + ', this.playerState_=' + this.playerState_);
    // TODO: remove this workaround once MediaManager detects buffering
    // immediately.
    if (mediaStatus.playerState === cast.receiver.media.PlayerState.PAUSED && this.playerState_ === castReceiverPlayer.State.BUFFERING) {
        mediaStatus.playerState = cast.receiver.media.PlayerState.BUFFERING;
    }
    return mediaStatus;
};
//@return {boolean} Whether the item can be preloaded.
castReceiverPlayer.ChromecastPlayer.prototype.onPreload_ = function (event) {//@see castplayer.ChromecastPlayer#load. @param {cast.receiver.MediaManager.Event} event The load event.
    console.log('MediaManager Event --- onPreload');
    var loadRequestData =
        /** @type {!cast.receiver.MediaManager.LoadRequestData} */ (event.data);
    return this.preload(loadRequestData.media);
};
//@return {boolean} Whether the item can be preloaded.
castReceiverPlayer.ChromecastPlayer.prototype.onCancelPreload_ = function (event) {//@see castplayer.ChromecastPlayer#load @param {cast.receiver.MediaManager.Event} event The load event.
    console.log('MediaManager Event --- onCancelPreload_');
    this.hidePreviewMode_();
    return true;
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueEnded_ = function (event) {
    console.log('MediaManager Event --- onQueueEnded_');
    console.log('onQueueEnded_ (event) event : ' + JSON.stringify(event));
    var self = this;
    self.onQueueEndedOrig_(event);
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueInsert_ = function (event) {
    console.log('MediaManager Event --- onQueueInsert_');
    console.log('onQueueInsert_ (event) event : ' + JSON.stringify(event));
    console.log('loadMetadata_');
    if (!castReceiverPlayer.isCastForAudioDevice_()) {
        var media = event.data.items[0].media;
        if (media) {
            var metadata = media.metadata || {};
            var titleElement = this.domElement_.querySelector(mediaTitleQueueClassName);
            castReceiverPlayer.setInnerText_(titleElement, metadata.title);
            var subtitleElement = this.domElement_.querySelector(mediaSubtitleQueueClassName);
            castReceiverPlayer.setInnerText_(subtitleElement, 'Add to queue');

            var artwork = castReceiverPlayer.getMediaImageUrl_(media);
            if (artwork) {
                var artworkElement = this.domElement_.querySelector(mediaArtWorkQueueClassName);
                castReceiverPlayer.setBackgroundImage_(artworkElement, artwork);
            }
        }
    }
    castReceiverPlayer.addClassWithTimeout_(this.domElement_, 'queue-event', 5000);
    var self = this;
    self.onQueueInsertOrig_(event);
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueLoad_ = function (event) {
    console.log('MediaManager Event --- onQueueLoad_');
    console.log('onQueueLoad_ (event) event : ' + JSON.stringify(event));
    var self = this;
    self.onQueueLoadOrig_(event);
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueRemove_ = function (event) {
    console.log('MediaManager Event --- onQueueRemove_');
    console.log('onQueueRemove_ (event) event : ' + JSON.stringify(event));
    var self = this;
    self.onQueueRemoveOrig_(event);
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueReorder_ = function (event) {
    console.log('MediaManager Event --- onQueueReorder_');
    console.log('onQueueReorder_ (event) event : ' + JSON.stringify(event));
    var self = this;
    self.onQueueReorderOrig_(event);
};
castReceiverPlayer.ChromecastPlayer.prototype.onQueueUpdate_ = function (event) {
    console.log('MediaManager Event ---onQueueUpdate_');
    console.log('onQueueUpdate_ (event) event : ' + JSON.stringify(event));
    var self = this;
    self.onQueueUpdateOrig_(event);
};
/* (End) function bound with MediaManager event*/

castReceiverPlayer.IDLE_TIMEOUT = {
    LAUNCHING: 6 * 60 * 1000, // 6 minutes
    LOADING: 6 * 60 * 1000,  // 6 minutes
    PAUSED: 10 * 60 * 1000,  // 10 minutes
    DONE: 6 * 60 * 1000,     // 6 minutes
    IDLE: 6 * 60 * 1000      // 6 minutes
};

castReceiverPlayer.Type = {
    AUDIO: 'audio',
    VIDEO: 'video',
    UNKNOWN: 'unknown'
};

castReceiverPlayer.TextTrackType = {//Describes the type of captions being used.
    SIDE_LOADED_TTML: 'ttml',
    SIDE_LOADED_VTT: 'vtt',
    SIDE_LOADED_UNSUPPORTED: 'unsupported',
    EMBEDDED: 'embedded'
};

castReceiverPlayer.CaptionsMimeType = {//Describes the type of captions being used.
    TTML: 'application/ttml+xml',
    VTT: 'text/vtt'
};

castReceiverPlayer.TrackType = {
    AUDIO: 'audio',
    VIDEO: 'video',
    TEXT: 'text'
};

castReceiverPlayer.State = {
    LAUNCHING: 'launching',
    LOADING: 'loading',
    BUFFERING: 'buffering',
    PLAYING: 'playing',
    PAUSED: 'paused',
    DONE: 'done',
    IDLE: 'idle'
};

castReceiverPlayer.BURN_IN_TIMEOUT = 30 * 1000; //The amount of time (millisecond) a screen should stay idle before burn in prevention kicks in. @type {number}
castReceiverPlayer.MEDIA_INFO_DURATION_ = 3 * 1000; //The minimum duration (millisecond) that media info is displayed. @const @private {number}
castReceiverPlayer.TRANSITION_DURATION_ = 1.5; //Transition animation duration (in sec). @const @private {number}
castReceiverPlayer.ENABLE_DEBUG_ = true; //Const to enable debugging. @const @private {boolean}
castReceiverPlayer.DISABLE_DEBUG_ = false; //Const to disable debugging. #@const @private {boolean}

/**
 * Preloads the given data.
 * @param {!cast.receiver.media.MediaInformation} mediaInformation The asset media information.
 * @return {boolean} Whether the media can be preloaded.
 * @export
 */
castReceiverPlayer.ChromecastPlayer.prototype.preload = function (mediaInformation) {
    console.log('function - preload');
    // For video formats that cannot be preloaded (mp4...), display preview UI.
    if (castReceiverPlayer.canDisplayPreview_(mediaInformation || {})) {
        this.showPreviewMode_(mediaInformation);
        return true;
    }
    if (!castReceiverPlayer.supportsPreload_(mediaInformation || {})) {
        console.log('preload - no supportsPreload_');
        return false;
    }
    if (this.preloadPlayer_) {
        this.preloadPlayer_.unload();
        this.preloadPlayer_ = null;
    }
    // Only videos are supported for now
    var couldPreload = this.preloadVideo_(mediaInformation);
    if (couldPreload) {
        this.showPreviewMode_(mediaInformation);
    }
    console.log('preload - couldPreload=' + couldPreload);
    console.log('(end) function - preload');
    return couldPreload;
};

/**
 * Display preview mode metadata.
 * @param {boolean} show whether player is showing preview mode metadata
 * @export
 */
castReceiverPlayer.ChromecastPlayer.prototype.showPreviewModeMetadata = function (show) {
    this.domElement_.setAttribute(domElementArtributePreviewMode, show.toString());
};

/**
 * Show the preview mode UI.
 * @param {!cast.receiver.media.MediaInformation} mediaInformation The asset media information.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.showPreviewMode_ = function (mediaInformation) {
    this.displayPreviewMode_ = true;
    this.loadPreviewModeMetadata_(mediaInformation);
    this.showPreviewModeMetadata(true);
};

/**
 * Hide the preview mode UI.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.hidePreviewMode_ = function () {
    this.showPreviewModeMetadata(false);
    this.displayPreviewMode_ = false;
};

/**
 * Preloads some video content.
 * @param {!cast.receiver.media.MediaInformation} mediaInformation The asset media information.
 * @return {boolean} Whether the video can be preloaded.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.preloadVideo_ = function (mediaInformation) {
    console.log('preloadVideo_');
    var self = this;
    var url = mediaInformation.contentId;
    var protocolFunc = castReceiverPlayer.getProtocolFunction_(mediaInformation);
    if (!protocolFunc) {
        console.log('No protocol found for preload');
        return false;
    }
    var host = new cast.player.api.Host({
        'url': url,
        'mediaElement': self.mediaElement_
    });
    host.onError = function () {
        self.preloadPlayer_.unload();
        self.preloadPlayer_ = null;
        self.showPreviewModeMetadata(false);
        self.displayPreviewMode_ = false;
        console.log('Error during preload');
    };
    self.preloadPlayer_ = new cast.player.api.Player(host);
    self.preloadPlayer_.preload(protocolFunc(host));
    return true;
};

castReceiverPlayer.ChromecastPlayer.prototype.load = function (info) { //@param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
    console.log('load cast.receiver.MediaManager.LoadInfo object');
    clearTimeout(this.idleTimerId_);
    var self = this;
    var media = info.message.media || {};
    var contentType = media.contentType;
    var playerType = castReceiverPlayer.getType_(media);
    var isLiveStream = media.streamType === cast.receiver.media.StreamType.LIVE;
    if (!media.contentId) {
        console.log('Load failed --- no content');
        self.onLoadMetadataError_(info);
    } else if (playerType === castReceiverPlayer.Type.UNKNOWN) {
        console.log('Load failed: unknown content type: ' + contentType);
        self.onLoadMetadataError_(info);
    } else {
        console.log('Loading: ' + playerType);
        self.resetMediaElement_();
        self.setMediaType_(playerType, isLiveStream);
        var preloaded = false;
        switch (playerType) {
            case castReceiverPlayer.Type.AUDIO:
                self.loadAudio_(info);
                break;
            case castReceiverPlayer.Type.VIDEO:
                preloaded = self.loadVideo_(info);
                break;
        }
        self.playerReady_ = false;
        self.metadataLoaded_ = false;
        self.loadMetadata_(media);
        self.showPreviewModeMetadata(false);
        self.displayPreviewMode_ = false;
        castReceiverPlayer.preload_(media, function () {
            console.log('preloaded=' + preloaded);
            if (preloaded) {
                // Data is ready to play so transiton directly to playing.
                self.setPlayerState_(castReceiverPlayer.State.PLAYING, false);
                self.playerReady_ = true;
                self.maybeSendLoadCompleted_(info);
                // Don't display metadata again, since autoplay already did that.
                self.deferPlay_(0);
                self.playerAutoPlay_ = false;
            } else {
                castReceiverPlayer.transition_(self.domElement_, castReceiverPlayer.TRANSITION_DURATION_, function () {
                    self.setPlayerState_(castReceiverPlayer.State.LOADING, false);
                    // Only send load completed after we reach this point so the media
                    // manager state is still loading and the sender can't send any PLAY
                    // messages
                    self.playerReady_ = true;
                    self.maybeSendLoadCompleted_(info);
                    if (self.playerAutoPlay_) {
                        // Make sure media info is displayed long enough before playback
                        // starts.
                        self.deferPlay_(castReceiverPlayer.MEDIA_INFO_DURATION_);
                        self.playerAutoPlay_ = false;
                    }
                });
            }
        });
    }
};

/**
 * Sends the load complete message to the sender if the two necessary conditions are met, the player is ready for messages and the loaded metadata event has been received.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.maybeSendLoadCompleted_ = function (info) {
    if (!this.playerReady_) {
        console.log('Deferring load response, player not ready');
    } else if (!this.metadataLoaded_) {
        console.log('Deferring load response, loadedmetadata event not received');
    } else {
        this.onMetadataLoadedOrig_(info);
        console.log('Sent load response, player is ready and metadata loaded');
    }
};

/**
 * Resets the media element.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.resetMediaElement_ = function () {
    console.log('resetMediaElement_');
    if (this.player_) {
        this.player_.unload();
        this.player_ = null;
    }
    this.textTrackType_ = null;
};


/**
 * Loads the metadata for the given media.
 * @param {!cast.receiver.media.MediaInformation} media The media.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadMetadata_ = function (media) {
    console.log('loadMetadata_');
    if (!castReceiverPlayer.isCastForAudioDevice_()) {
        var metadata = media.metadata || {};
        var titleElement = this.domElement_.querySelector(mediaTitleClassName);
        castReceiverPlayer.setInnerText_(titleElement, metadata.title);

        var subtitleElement = this.domElement_.querySelector(mediaSubtitleClassName);
        castReceiverPlayer.setInnerText_(subtitleElement, metadata.subtitle);

        var artwork = castReceiverPlayer.getMediaImageUrl_(media);
        if (artwork) {
            var artworkElement = this.domElement_.querySelector(mediaArtworkClassName);
            castReceiverPlayer.setBackgroundImage_(artworkElement, artwork);
        }
    }
};

/**
 * Loads the metadata for the given preview mode media.
 * @param {!cast.receiver.media.MediaInformation} media The media.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadPreviewModeMetadata_ = function (media) {
    console.log('loadPreviewModeMetadata_');
    if (!castReceiverPlayer.isCastForAudioDevice_()) {
        var metadata = media.metadata || {};
        var titleElement = this.domElement_.querySelector(previewModeTitleClassName);
        castReceiverPlayer.setInnerText_(titleElement, metadata.title);

        var subtitleElement = this.domElement_.querySelector(previewModeSubtitleClassName);
        castReceiverPlayer.setInnerText_(subtitleElement, metadata.subtitle);

        var artwork = castReceiverPlayer.getMediaImageUrl_(media);
        if (artwork) {
            var artworkElement = this.domElement_.querySelector(previewModeArtworkClassName);
            castReceiverPlayer.setBackgroundImage_(artworkElement, artwork);
        }
    }
};

/**
 * Lets player handle autoplay, instead of depending on underlying
 * MediaElement to handle it. By this way, we can make sure that media playback
 * starts after loading screen is displayed.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.letPlayerHandleAutoPlay_ = function (info) {
    console.log('letPlayerHandleAutoPlay_: ' + info.message.autoplay);
    var autoplay = info.message.autoplay;
    info.message.autoplay = false;
    this.mediaElement_.autoplay = false;
    this.playerAutoPlay_ = autoplay == undefined ? true : autoplay;
};


/**
 * Loads some audio content.
 *
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadAudio_ = function (info) {
    console.log('loadAudio_');
    this.letPlayerHandleAutoPlay_(info);
    this.loadDefault_(info);
};

/**
 * Loads some video content.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @return {boolean} Whether the media was preloaded
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadVideo_ = function (info) {
    console.log('loadVideo_');
    var self = this;
    var protocolFunc = null;
    var url = info.message.media.contentId;
    var protocolFunc = castReceiverPlayer.getProtocolFunction_(info.message.media);
    var wasPreloaded = false;

    this.letPlayerHandleAutoPlay_(info);
    if (!protocolFunc) {
        console.log('loadVideo_: using MediaElement');
        this.mediaElement_.addEventListener('stalled', this.bufferingHandler_,
            false);
        this.mediaElement_.addEventListener('waiting', this.bufferingHandler_,
            false);
    } else {
        console.log('loadVideo_: using Media Player Library');
        // When MPL is used, buffering status should be detected by
        // getState()['underflow]'
        this.mediaElement_.removeEventListener('stalled', this.bufferingHandler_);
        this.mediaElement_.removeEventListener('waiting', this.bufferingHandler_);

        // If we have not preloaded or the content preloaded does not match the
        // content that needs to be loaded, perform a full load
        var loadErrorCallback = function () {
            // unload player and trigger error event on media element
            if (self.player_) {
                self.resetMediaElement_();
                self.mediaElement_.dispatchEvent(new Event('error'));
            }
        };
        if (!this.preloadPlayer_ || (this.preloadPlayer_.getHost &&
            this.preloadPlayer_.getHost().url != url)) {
            if (this.preloadPlayer_) {
                this.preloadPlayer_.unload();
                this.preloadPlayer_ = null;
            }
            console.log('Regular video load');
            var host = new cast.player.api.Host({
                'url': url,
                'mediaElement': this.mediaElement_
            });
            host.onError = loadErrorCallback;
            this.player_ = new cast.player.api.Player(host);
            this.player_.load(protocolFunc(host));
        } else {
            console.log('Preloaded video load');
            this.player_ = this.preloadPlayer_;
            this.preloadPlayer_ = null;
            // Replace the "preload" error callback with the "load" error callback
            this.player_.getHost().onError = loadErrorCallback;
            this.player_.load();
            wasPreloaded = true;
        }
    }
    this.loadMediaManagerInfo_(info, !!protocolFunc);
    return wasPreloaded;
};


/**
 * Loads media and tracks info into media manager.
 *
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @param {boolean} loadOnlyTracksMetadata Only load the tracks metadata (if
 *     it is in the info provided).
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadMediaManagerInfo_ =
    function (info, loadOnlyTracksMetadata) {

        if (loadOnlyTracksMetadata) {
            // In the case of media that uses MPL we do not
            // use the media manager default onLoad API but we still need to load
            // the tracks metadata information into media manager (so tracks can be
            // managed and properly reported in the status messages) if they are
            // provided in the info object (side loaded).
            this.maybeLoadSideLoadedTracksMetadata_(info);
        } else {
            // Media supported by mediamanager, use the media manager default onLoad API
            // to load the media, tracks metadata and, if the tracks are vtt the media
            // manager will process the cues too.
            this.loadDefault_(info);
        }
    };


/**
 * Sets the captions type based on the text tracks.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.readSideLoadedTextTrackType_ =
    function (info) {
        if (!info.message || !info.message.media || !info.message.media.tracks) {
            return;
        }
        for (var i = 0; i < info.message.media.tracks.length; i++) {
            var oldTextTrackType = this.textTrackType_;
            if (info.message.media.tracks[i].type !=
                cast.receiver.media.TrackType.TEXT) {
                continue;
            }
            if (this.isTtmlTrack_(info.message.media.tracks[i])) {
                this.textTrackType_ =
                    castReceiverPlayer.TextTrackType.SIDE_LOADED_TTML;
            } else if (this.isVttTrack_(info.message.media.tracks[i])) {
                this.textTrackType_ =
                    castReceiverPlayer.TextTrackType.SIDE_LOADED_VTT;
            } else {
                console.log('Unsupported side loaded text track types');
                this.textTrackType_ =
                    castReceiverPlayer.TextTrackType.SIDE_LOADED_UNSUPPORTED;
                break;
            }
            // We do not support text tracks with different caption types for a single
            // piece of content
            if (oldTextTrackType && oldTextTrackType != this.textTrackType_) {
                console.log('Load has inconsistent text track types');
                this.textTrackType_ =
                    castReceiverPlayer.TextTrackType.SIDE_LOADED_UNSUPPORTED;
                break;
            }
        }
    };


/**
 * If there is tracks information in the LoadInfo, it loads the side loaded
 * tracks information in the media manager without loading media.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.maybeLoadSideLoadedTracksMetadata_ =
    function (info) {
        // If there are no tracks we will not load the tracks information here as
        // we are likely in a embedded captions scenario and the information will
        // be loaded in the onMetadataLoaded_ callback
        if (!info.message || !info.message.media || !info.message.media.tracks ||
            info.message.media.tracks.length == 0) {
            return;
        }
        var tracksInfo = /** @type {cast.receiver.media.TracksInfo} **/ ({
            tracks: info.message.media.tracks,
            activeTrackIds: info.message.activeTrackIds,
            textTrackStyle: info.message.media.textTrackStyle
        });
        this.mediaManager_.loadTracksInfo(tracksInfo);
    };


/**
 * Loads embedded tracks information without loading media.
 * If there is embedded tracks information, it loads the tracks information
 * in the media manager without loading media.
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.maybeLoadEmbeddedTracksMetadata_ =
    function (info) {
        if (!info.message || !info.message.media) {
            return;
        }
        var tracksInfo = this.readInBandTracksInfo_();
        if (tracksInfo) {
            this.textTrackType_ = castReceiverPlayer.TextTrackType.EMBEDDED;
            tracksInfo.textTrackStyle = info.message.media.textTrackStyle;
            this.mediaManager_.loadTracksInfo(tracksInfo);
        }
    };


/**
 * Processes ttml tracks and enables the active ones.
 * @param {!Array.<number>} activeTrackIds The active tracks.
 * @param {!Array.<cast.receiver.media.Track>} tracks The track definitions.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.processTtmlCues_ =
    function (activeTrackIds, tracks) {
        if (activeTrackIds.length == 0) {
            return;
        }
        // If there is an active text track, that is using ttml, apply it
        for (var i = 0; i < tracks.length; i++) {
            var contains = false;
            for (var j = 0; j < activeTrackIds.length; j++) {
                if (activeTrackIds[j] == tracks[i].trackId) {
                    contains = true;
                    break;
                }
            }
            if (!contains ||
                !this.isTtmlTrack_(tracks[i])) {
                continue;
            }
            if (!this.player_) {
                // We do not have a player, it means we need to create it to support
                // loading ttml captions
                var host = new cast.player.api.Host({
                    'url': '',
                    'mediaElement': this.mediaElement_
                });
                this.protocol_ = null;
                this.player_ = new cast.player.api.Player(host);
            }
            this.player_.enableCaptions(
                true, cast.player.api.CaptionsType.TTML, tracks[i].trackContentId);
        }
    };


/**
 * Checks if a track is TTML.
 *
 * @param {cast.receiver.media.Track} track The track.
 * @return {boolean} Whether the track is in TTML format.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.isTtmlTrack_ = function (track) {
    return this.isKnownTextTrack_(track,
        castReceiverPlayer.TextTrackType.SIDE_LOADED_TTML,
        castReceiverPlayer.CaptionsMimeType.TTML);
};


/**
 * Checks if a track is VTT.
 *
 * @param {cast.receiver.media.Track} track The track.
 * @return {boolean} Whether the track is in VTT format.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.isVttTrack_ = function (track) {
    return this.isKnownTextTrack_(track,
        castReceiverPlayer.TextTrackType.SIDE_LOADED_VTT,
        castReceiverPlayer.CaptionsMimeType.VTT);
};


/**
 * Checks if a track is of a known type by verifying the extension or mimeType.
 *
 * @param {cast.receiver.media.Track} track The track.
 * @param {!castReceiverPlayer.TextTrackType} textTrackType The text track
 *     type expected.
 * @param {!string} mimeType The mimeType expected.
 * @return {boolean} Whether the track has the specified format.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.isKnownTextTrack_ =
    function (track, textTrackType, mimeType) {
        if (!track) {
            return false;
        }
        // The castReceiverPlayer.TextTrackType values match the
        // file extensions required
        var fileExtension = textTrackType;
        var trackContentId = track.trackContentId;
        var trackContentType = track.trackContentType;
        if ((trackContentId &&
            castReceiverPlayer.getExtension_(trackContentId) === fileExtension) ||
            (trackContentType && trackContentType.indexOf(mimeType) === 0)) {
            return true;
        }
        return false;
    };


/**
 * Processes embedded tracks, if they exist.
 *
 * @param {!Array.<number>} activeTrackIds The active tracks.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.processInBandTracks_ =
    function (activeTrackIds) {
        var protocol = this.player_.getStreamingProtocol();
        var streamCount = protocol.getStreamCount();
        for (var i = 0; i < streamCount; i++) {
            var trackId = i + 1;
            var isActive = false;
            for (var j = 0; j < activeTrackIds.length; j++) {
                if (activeTrackIds[j] == trackId) {
                    isActive = true;
                    break;
                }
            }
            var wasActive = protocol.isStreamEnabled(i);
            if (isActive && !wasActive) {
                protocol.enableStream(i, true);
            } else if (!isActive && wasActive) {
                protocol.enableStream(i, false);
            }
        }
    };


/**
 * Reads in-band tracks info, if they exist.
 *
 * @return {cast.receiver.media.TracksInfo} The tracks info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.readInBandTracksInfo_ = function () {
    var protocol = this.player_ ? this.player_.getStreamingProtocol() : null;
    if (!protocol) {
        return null;
    }
    var streamCount = protocol.getStreamCount();
    var activeTrackIds = [];
    var tracks = [];
    for (var i = 0; i < streamCount; i++) {
        var trackId = i + 1;
        if (protocol.isStreamEnabled(i)) {
            activeTrackIds.push(trackId);
        }
        var streamInfo = protocol.getStreamInfo(i);
        var mimeType = streamInfo.mimeType;
        var track;
        if (mimeType.indexOf(castReceiverPlayer.TrackType.TEXT) === 0 ||
            mimeType === castReceiverPlayer.CaptionsMimeType.TTML) {
            track = new cast.receiver.media.Track(
                trackId, cast.receiver.media.TrackType.TEXT);
        } else if (mimeType.indexOf(castReceiverPlayer.TrackType.VIDEO) === 0) {
            track = new cast.receiver.media.Track(
                trackId, cast.receiver.media.TrackType.VIDEO);
        } else if (mimeType.indexOf(castReceiverPlayer.TrackType.AUDIO) === 0) {
            track = new cast.receiver.media.Track(
                trackId, cast.receiver.media.TrackType.AUDIO);
        }
        if (track) {
            track.name = streamInfo.name;
            track.language = streamInfo.language;
            track.trackContentType = streamInfo.mimeType;
            tracks.push(track);
        }
    }
    if (tracks.length === 0) {
        return null;
    }
    var tracksInfo = /** @type {cast.receiver.media.TracksInfo} **/ ({
        tracks: tracks,
        activeTrackIds: activeTrackIds
    });
    return tracksInfo;
};


/**
 * Loads some media by delegating to default media manager.
 *
 * @param {!cast.receiver.MediaManager.LoadInfo} info The load request info.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.loadDefault_ = function (info) {
    this.onLoadOrig_(new cast.receiver.MediaManager.Event(
        cast.receiver.MediaManager.EventType.LOAD,
        /** @type {!cast.receiver.MediaManager.RequestData} */ (info.message),
        info.senderId));
};

/**
 * Sets the amount of time before the player is considered idle.
 * @param {number} t the time in milliseconds before the player goes idle
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.setIdleTimeout_ = function (t) {
    console.log('setIdleTimeout_: ' + t);
    var self = this;
    clearTimeout(this.idleTimerId_);
    if (t) {
        this.idleTimerId_ = setTimeout(function () {
            self.receiverManager_.stop();
        }, t);
    }
};


/**
 * Sets the type of player.
 * @param {castReceiverPlayer.Type} type The type of player.
 * @param {boolean} isLiveStream whether player is showing live content
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.setMediaType_ = function (type, isLiveStream) {
    console.log('setMediaType_: ' + type);
    this.mediaType_ = type;
    this.domElement_.setAttribute(domElementArtributeType, type);
    this.domElement_.setAttribute(domElementArtributeLive, isLiveStream.toString());
    var overlay = this.getElementByClass_(overlayClassName);
    var watermark = this.getElementByClass_(watermarkClassName);
    clearInterval(this.burnInPreventionIntervalId_);
    if (type != castReceiverPlayer.Type.AUDIO) {
        overlay.removeAttribute('style');
    } else {
        overlay.removeAttribute('style');
    }
};

/**
 * Sets the state of the player.
 * @param {castReceiverPlayer.State} state the new state of the player
 * @param {boolean=} opt_crossfade true if should cross fade between states
 * @param {number=} opt_delay the amount of time (in ms) to wait
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.setPlayerState_ = function (state, opt_crossfade, opt_delay) {
    console.log('setPlayerState_: state=' + state + ', crossfade=' + opt_crossfade + ', delay=' + opt_delay);
    var self = this;
    self.lastStateTransitionTime_ = Date.now();
    clearTimeout(self.delay_);
    if (opt_delay) {
        var func = function () {
            self.setPlayerState_(state, opt_crossfade);
        };
        self.delay_ = setTimeout(func, opt_delay);
    } else {
        if (!opt_crossfade) {
            self.playerState_ = state;
            self.domElement_.setAttribute(domElementArtributeState, state);
            self.updateApplicationState_();
            self.setIdleTimeout_(castReceiverPlayer.IDLE_TIMEOUT[state.toUpperCase()]);
        } else {
            var stateTransitionTime = self.lastStateTransitionTime_;
            castReceiverPlayer.transition_(self.domElement_, castReceiverPlayer.TRANSITION_DURATION_,
                function () {
                    // In the case of a crossfade transition, the transition will be completed
                    // even if setState is called during the transition.  We need to be sure
                    // that the requested state is ignored as the latest setState call should
                    // take precedence.
                    if (stateTransitionTime < self.lastStateTransitionTime_) {
                        console.log('discarded obsolete deferred state(' + state + ').');
                        return;
                    }
                    self.setPlayerState_(state, false);
                });
        }
    }
};


/**
 * Updates the application state if it has changed.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.updateApplicationState_ = function () {
    console.log('updateApplicationState_');
    if (this.mediaManager_) {
        var idle = this.playerState_ === castReceiverPlayer.State.IDLE;
        var media = idle ? null : this.mediaManager_.getMediaInformation();
        var applicationState = castReceiverPlayer.getApplicationState_(media);
        if (this.curAppState_ != applicationState) {
            this.curAppState_ = applicationState;
            this.receiverManager_.setApplicationState(applicationState);
        }
    }
};

/**
 * Called when media is buffering. If we were previously playing, transition to the BUFFERING state.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.onBuffering_ = function () {
    console.log('onBuffering[readyState=' + this.mediaElement_.readyState + ']');
    if (this.playerState_ === castReceiverPlayer.State.PLAYING &&
        this.mediaElement_.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) {
        this.setPlayerState_(castReceiverPlayer.State.BUFFERING, false);
    }
};

castReceiverPlayer.ChromecastPlayer.prototype.cancelDeferredPlay_ = function (cancelReason) { //@param {string} cancelReason
    if (this.deferredPlayCallbackId_) {
        console.log('Cancelled deferred playback: ' + cancelReason);
        clearTimeout(this.deferredPlayCallbackId_);
        this.deferredPlayCallbackId_ = null;
    }
};

/**
 * Defers playback start by given timeout.
 * @param {number} timeout In msec.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.deferPlay_ = function (timeout) {
    console.log('Defering playback for ' + timeout + ' ms');
    var self = this;
    this.deferredPlayCallbackId_ = setTimeout(function () {
        self.deferredPlayCallbackId_ = null;
        if (self.player_) {
            console.log('Playing when enough data');
            self.player_.playWhenHaveEnoughData();
        } else {
            console.log('Playing');
            self.mediaElement_.play();
        }
    }, timeout);
};

/**
 * Called when the media is successfully loaded. Updates the progress bar.
 * @private
 */
castReceiverPlayer.ChromecastPlayer.prototype.onLoadSuccess_ = function () {
    console.log('onLoadSuccess');
    // we should have total time at this point, so update the label
    // and progress bar
    var totalTime = this.mediaElement_.duration;
	if(this.loadedMediaInfor_.data.media.streamType === cast.receiver.media.StreamType.LIVE){
		totalTime = this.loadedLiveDuration_;
	}
    if (!isNaN(totalTime)) {
        this.totalTimeElement_.textContent = castReceiverPlayer.formatDuration_(totalTime);

    } else {
        this.totalTimeElement_.textContent = '';
        this.progressBarInnerElement_.style.width = '100%';
        this.progressBarThumbElement_.style.left = '100%';
    }
};

/**
 * Returns the image url for the given media object.
 * @param {!cast.receiver.media.MediaInformation} media The media.
 * @return {string|undefined} The image url.
 * @private
 */
castReceiverPlayer.getMediaImageUrl_ = function (media) {
    var metadata = media.metadata || {};
    var images = metadata['images'] || [];
    return images && images[0] && images[0]['url'];
};

/**
 * Gets the adaptive streaming protocol creation function based on the media information.
 * @param {!cast.receiver.media.MediaInformation} mediaInformation The
 *     asset media information.
 * @return {?function(cast.player.api.Host):player.StreamingProtocol}
 *     The protocol function that corresponds to this media type.
 * @private
 */
castReceiverPlayer.getProtocolFunction_ = function (mediaInformation) {
    var url = mediaInformation.contentId;
    var type = mediaInformation.contentType || '';
    var path = castReceiverPlayer.getPath_(url) || '';
    if (castReceiverPlayer.getExtension_(path) === 'm3u8' ||
        type === 'application/x-mpegurl' ||
        type === 'application/vnd.apple.mpegurl') {
        return cast.player.api.CreateHlsStreamingProtocol;
    } else if (castReceiverPlayer.getExtension_(path) === 'mpd' ||
        type === 'application/dash+xml') {
        return cast.player.api.CreateDashStreamingProtocol;
    } else if (path.indexOf('.ism') > -1 ||
        type === 'application/vnd.ms-sstr+xml') {
        return cast.player.api.CreateSmoothStreamingProtocol;
    }
    return null;
};


/**
 * Returns true if the media can be preloaded.
 * @param {!cast.receiver.media.MediaInformation} media The media information.
 * @return {boolean} whether the media can be preloaded.
 * @private
 */
castReceiverPlayer.supportsPreload_ = function (media) {
    return castReceiverPlayer.getProtocolFunction_(media) != null;
};


/**
 * Returns true if the preview UI should be shown for the type of media
 * although the media can not be preloaded.
 * @param {!cast.receiver.media.MediaInformation} media The media information.
 * @return {boolean} whether the media can be previewed.
 * @private
 */
castReceiverPlayer.canDisplayPreview_ = function (media) {
    var contentId = media.contentId || '';
    var contentUrlPath = castReceiverPlayer.getPath_(contentId);
    if (castReceiverPlayer.getExtension_(contentUrlPath) === 'mp4') {
        return true;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'ogv') {
        return true;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'webm') {
        return true;
    }
    return false;
};

/**
 * Returns the type of player to use for the given media.
 * By default this looks at the media's content type, but falls back
 * to file extension if not set.
 * @param {!cast.receiver.media.MediaInformation} media The media.
 * @return {castReceiverPlayer.Type} The player type.
 * @private
 */
castReceiverPlayer.getType_ = function (media) {
    var contentId = media.contentId || '';
    var contentType = media.contentType || '';
    var contentUrlPath = castReceiverPlayer.getPath_(contentId);
    if (contentType.indexOf('audio/') === 0) {
        return castReceiverPlayer.Type.AUDIO;
    } else if (contentType.indexOf('video/') === 0) {
        return castReceiverPlayer.Type.VIDEO;
    } else if (contentType.indexOf('application/x-mpegurl') === 0) {
        return castReceiverPlayer.Type.VIDEO;
    } else if (contentType.indexOf('application/vnd.apple.mpegurl') === 0) {
        return castReceiverPlayer.Type.VIDEO;
    } else if (contentType.indexOf('application/dash+xml') === 0) {
        return castReceiverPlayer.Type.VIDEO;
    } else if (contentType.indexOf('application/vnd.ms-sstr+xml') === 0) {
        return castReceiverPlayer.Type.VIDEO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'mp3') {
        return castReceiverPlayer.Type.AUDIO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'oga') {
        return castReceiverPlayer.Type.AUDIO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'wav') {
        return castReceiverPlayer.Type.AUDIO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'mp4') {
        return castReceiverPlayer.Type.VIDEO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'ogv') {
        return castReceiverPlayer.Type.VIDEO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'webm') {
        return castReceiverPlayer.Type.VIDEO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'm3u8') {
        return castReceiverPlayer.Type.VIDEO;
    } else if (castReceiverPlayer.getExtension_(contentUrlPath) === 'mpd') {
        return castReceiverPlayer.Type.VIDEO;
    } else if (contentType.indexOf('.ism') != 0) {
        return castReceiverPlayer.Type.VIDEO;
    }
    return castReceiverPlayer.Type.UNKNOWN;
};

castReceiverPlayer.transition_ = function (element, time, cbfunction) {
    if (time <= 0 || castReceiverPlayer.isCastForAudioDevice_()) {
        // No transitions supported for Cast for Audio devices
        cbfunction();
    } else {
        castReceiverPlayer.fadeOut_(element, time / 2.0, function () {
            cbfunction();
            castReceiverPlayer.fadeIn_(element, time / 2.0);
        });
    }
};

/**
 * Preloads media data that can be preloaded.
 * @param {!cast.receiver.media.MediaInformation} media The media to load.
 * @param {function()} doneFunc The function to call when done.
 * @private
 */
castReceiverPlayer.preload_ = function (media, doneFunc) {
    if (castReceiverPlayer.isCastForAudioDevice_()) {
        // No preloading for Cast for Audio devices
        doneFunc();
        return;
    }

    var imagesToPreload = [];
    var counter = 0;
    var images = [];

    function imageLoaded() {
        if (++counter === imagesToPreload.length) {
            doneFunc();
        }
    }

    // try to preload image metadata
    var thumbnailUrl = castReceiverPlayer.getMediaImageUrl_(media);
    if (thumbnailUrl) {
        imagesToPreload.push(thumbnailUrl);
    }
    if (imagesToPreload.length === 0) {
        doneFunc();
    } else {
        for (var i = 0; i < imagesToPreload.length; i++) {
            images[i] = new Image();
            images[i].src = imagesToPreload[i];
            images[i].onload = function () {
                imageLoaded();
            };
            images[i].onerror = function () {
                imageLoaded();
            };
        }
    }
};

/**
 * Called to determine if the receiver device is an audio device.
 * @return {boolean} Whether the device is a Cast for Audio device.
 * @private
 */
castReceiverPlayer.isCastForAudioDevice_ = function () {
    var receiverManager = window.cast.receiver.CastReceiverManager.getInstance();
    if (receiverManager) {
        var deviceCapabilities = receiverManager.getDeviceCapabilities();
        if (deviceCapabilities) {
            return deviceCapabilities['display_supported'] === false;
        }
    }
    return false;
};

/*DOM and JS function*/
castReceiverPlayer.ChromecastPlayer.prototype.getElementByClass_ = function (className) {
    var element = this.domElement_.querySelector(className);
    if (element) {
        return element;
    } else {
        throw Error('Cannot find child element: className = ' + className + ' from this domElement: id =  ' + this.domElement_.id + ', className = ' + this.domElement_.className);
    }
};
castReceiverPlayer.getPath_ = function (url) {
    var href = document.createElement('a');
    href.href = url;
    return href.pathname || '';//Returns the URL path.
};
castReceiverPlayer.setInnerText_ = function (element, opt_text) {
    if (!element) {
        return;
    }
    element.innerText = opt_text || '';
};
castReceiverPlayer.setBackgroundImage_ = function (element, opt_url) {
    if (!element) {
        return;
    }
    element.style.backgroundImage = (opt_url ? 'url("' + opt_url.replace(/"/g, '\\"') + '")' : 'none');
    element.style.display = (opt_url ? '' : 'none');
};
castReceiverPlayer.getExtension_ = function (url) {
    var parts = url.split('.');
    // Handle files with no extensions and hidden files with no extension
    if (parts.length === 1 || (parts[0] === '' && parts.length === 2)) {
        return '';
    }
    return parts.pop().toLowerCase();
};
/**
 * Causes the given element to fade to the given opacity in the given amount of time.
 * @param {!Element} element The element to fade in/out.
 * @param {string|number} opacity The opacity to transition to.
 * @param {number} time The amount of time (in seconds) to transition.
 * @param {function()=} opt_doneFunc The function to call when complete.
 * @private
 */
castReceiverPlayer.fadeTo_ = function (element, opacity, time, opt_doneFunc) {
    var self = this;
    var id = Date.now();
    var listener = function () {
        element.style.webkitTransition = '';
        element.removeEventListener('webkitTransitionEnd', listener, false);
        if (opt_doneFunc) {
            opt_doneFunc();
        }
    };
    element.addEventListener('webkitTransitionEnd', listener, false);
    element.style.webkitTransition = 'opacity ' + time + 's';
    element.style.opacity = opacity;
};
castReceiverPlayer.fadeIn_ = function (element, time, opt_doneFunc) {
    castReceiverPlayer.fadeTo_(element, '', time, opt_doneFunc);
};
castReceiverPlayer.fadeOut_ = function (element, time, opt_doneFunc) {
    castReceiverPlayer.fadeTo_(element, 0, time, opt_doneFunc);
};
castReceiverPlayer.addClassWithTimeout_ = function (element, className, timeout) {
    element.classList.add(className);
    return setTimeout(function () {
        element.classList.remove(className);
    }, timeout);
};
castReceiverPlayer.ChromecastPlayer.prototype.updateProgress_ = function () {
    // Update the time and the progress bar
    if (!castReceiverPlayer.isCastForAudioDevice_()) {
        var curTime = this.mediaElement_.currentTime;
        var totalTime = this.mediaElement_.duration;
        if (!isNaN(curTime) && !isNaN(totalTime)) {
			if(this.loadedMediaInfor_.data.media.streamType === cast.receiver.media.StreamType.LIVE){
				totalTime = this.loadedLiveDuration_;
			}
            var pct = 100 * (curTime / totalTime);
            this.curTimeElement_.innerText = castReceiverPlayer.formatDuration_(curTime);
            this.totalTimeElement_.innerText = castReceiverPlayer.formatDuration_(totalTime);
            this.progressBarInnerElement_.style.width = pct + '%';
            this.progressBarThumbElement_.style.left = pct + '%';
            // Handle preview mode
            if (this.displayPreviewMode_) {
                this.previewModeTimerElement_.innerText = "" + Math.round(totalTime - curTime);
            }
        }
    }
};
castReceiverPlayer.formatDuration_ = function (dur) {
    dur = Math.floor(dur);
    function digit(n) {
        return ('00' + Math.round(n)).slice(-2);
    }

    var hr = Math.floor(dur / 3600);
    var min = Math.floor(dur / 60) % 60;
    var sec = dur % 60;
    if (!hr) {
        return digit(min) + ':' + digit(sec);
    } else {
        return digit(hr) + ':' + digit(min) + ':' + digit(sec);
    }
};
/* (End) DOM and JS function*/