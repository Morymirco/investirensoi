"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaCheck,
  FaLock,
  FaDownload,
  FaBookmark,
  FaRegBookmark,
  FaCog,
  FaHome,
  FaBars,
  FaTimes,
  FaRegLightbulb,
  FaRegFileAlt,
  FaRegQuestionCircle,
  FaRegCommentDots,
  FaArrowLeft,
  FaCode,
  FaImage,
  FaFile,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sidebar, SidebarProvider, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar"
import React from "react"

// Custom video player component
const VideoPlayer = React.memo(({ videoSrc, poster, onComplete }) => {
  const videoRef = useRef(null)
  const progressBarRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Handle volume change
  const handleVolumeChange = useCallback(
    (e) => {
      const newVolume = Number.parseFloat(e.target.value)
      setVolume(newVolume)
      if (videoRef.current) {
        videoRef.current.volume = newVolume
      }
      setIsMuted(newVolume === 0)
    },
    [volume],
  )

  // Handle mute toggle
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5
        setVolume(volume || 0.5)
      } else {
        videoRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }, [isMuted, volume])

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }, [])

  // Handle playback rate change
  const changePlaybackRate = useCallback((rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }, [])

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)

      // Check if video is complete (with a small buffer)
      if (videoRef.current.currentTime >= videoRef.current.duration - 0.5) {
        onComplete && onComplete()
      }
    }
  }

  // Handle seeking
  const handleSeek = (e) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = pos * videoRef.current.duration
    }
  }

  // Handle metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle controls visibility
  const showControlsTemporarily = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  // Clean up timeout on unmount and when isPlaying changes
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full aspect-video"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetadataLoaded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Play/Pause overlay button */}
      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#048B9A]/80 rounded-full flex items-center justify-center"
          onClick={togglePlay}
        >
          <FaPlay className="text-white w-8 h-8 ml-1" />
        </button>
      )}

      {/* Video controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className="w-full h-2 bg-gray-700 rounded-full mb-4 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-[#048B9A] rounded-full relative"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause button */}
            <button onClick={togglePlay} className="text-white hover:text-[#048B9A] transition-colors">
              {isPlaying ? <FaPause className="w-5 h-5" /> : <FaPlay className="w-5 h-5" />}
            </button>

            {/* Volume control */}
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white hover:text-[#048B9A] transition-colors">
                {isMuted ? <FaVolumeMute className="w-5 h-5" /> : <FaVolumeUp className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-[#048B9A]"
              />
            </div>

            {/* Time display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Playback speed */}
            <div className="relative group">
              <button className="text-white hover:text-[#048B9A] transition-colors text-sm font-medium">
                {playbackRate}x
              </button>
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-[#151627] border border-gray-800 rounded-md p-1 w-20">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    className={`block w-full text-left px-2 py-1 text-sm rounded ${playbackRate === rate ? "bg-[#048B9A] text-white" : "text-white hover:bg-gray-700"}`}
                    onClick={() => changePlaybackRate(rate)}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Fullscreen button */}
            <button onClick={toggleFullscreen} className="text-white hover:text-[#048B9A] transition-colors">
              {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

// Course sidebar navigation component
const CourseNavigation = ({ chapters, currentChapter, currentLesson, onSelectLesson, progress }) => {
  const [expandedChapters, setExpandedChapters] = useState([0])

  const toggleChapter = useCallback(
    (index) => {
      if (expandedChapters.includes(index)) {
        setExpandedChapters(expandedChapters.filter((i) => i !== index))
      } else {
        setExpandedChapters([...expandedChapters, index])
      }
    },
    [expandedChapters],
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-medium">Contenu du cours</h2>
          <span className="text-[#048B9A] text-sm font-medium">{progress}% terminé</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-gray-700" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="border-b border-gray-800">
            <button
              className="w-full flex justify-between items-center p-4 hover:bg-[#1C1D33] transition-colors text-left"
              onClick={() => toggleChapter(chapterIndex)}
            >
              <div className="flex items-center">
                {chapter.isCompleted ? (
                  <div className="w-5 h-5 rounded-full bg-[#048B9A]/20 flex items-center justify-center mr-3">
                    <FaCheck className="text-[#048B9A] w-3 h-3" />
                  </div>
                ) : chapter.isLocked ? (
                  <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <FaLock className="text-gray-500 w-3 h-3" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-700 mr-3"></div>
                )}
                <div>
                  <span className="text-gray-400 text-xs block">Chapitre {chapterIndex + 1}</span>
                  <span className="text-white font-medium">{chapter.title}</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">{chapter.duration}</span>
                <FaChevronDown
                  className={`text-gray-400 transition-transform ${expandedChapters.includes(chapterIndex) ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            <AnimatePresence>
              {expandedChapters.includes(chapterIndex) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-[#0A0B1C]">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      const isActive = currentChapter === chapterIndex && currentLesson === lessonIndex
                      const isCompleted = lesson.isCompleted
                      const isLocked = lesson.isLocked || chapter.isLocked

                      return (
                        <button
                          key={lessonIndex}
                          className={`w-full flex items-center p-3 pl-12 text-left border-l-2 ${isActive ? "border-[#048B9A] bg-[#048B9A]/10" : "border-transparent hover:bg-[#151627]"} ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={() => !isLocked && onSelectLesson(chapterIndex, lessonIndex)}
                          disabled={isLocked}
                        >
                          <div className="flex items-center flex-1 min-w-0">
                            {isCompleted ? (
                              <div className="w-5 h-5 rounded-full bg-[#048B9A]/20 flex items-center justify-center mr-3">
                                <FaCheck className="text-[#048B9A] w-3 h-3" />
                              </div>
                            ) : isLocked ? (
                              <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                                <FaLock className="text-gray-500 w-3 h-3" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-700 mr-3"></div>
                            )}

                            <div className="flex-1 min-w-0">
                              <span className={`block truncate ${isActive ? "text-[#048B9A]" : "text-gray-300"}`}>
                                {lesson.title}
                              </span>
                              <div className="flex items-center mt-1">
                                {lesson.type === "video" ? (
                                  <FaPlay className="text-gray-500 w-3 h-3 mr-1" />
                                ) : lesson.type === "quiz" ? (
                                  <FaRegQuestionCircle className="text-gray-500 w-3 h-3 mr-1" />
                                ) : lesson.type === "text" ? (
                                  <FaRegFileAlt className="text-gray-500 w-3 h-3 mr-1" />
                                ) : (
                                  <FaRegLightbulb className="text-gray-500 w-3 h-3 mr-1" />
                                )}
                                <span className="text-gray-500 text-xs">{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

// Notes component
const Notes = React.memo(({ notes, onAddNote, onUpdateNote, onDeleteNote }) => {
  const [newNote, setNewNote] = useState("")
  const [editingNote, setEditingNote] = useState(null)
  const [editText, setEditText] = useState("")

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        id: Date.now(),
        text: newNote,
        timestamp: new Date().toISOString(),
      })
      setNewNote("")
    }
  }

  const handleUpdateNote = () => {
    if (editText.trim() && editingNote) {
      onUpdateNote({
        ...editingNote,
        text: editText,
      })
      setEditingNote(null)
      setEditText("")
    }
  }

  const startEditing = (note) => {
    setEditingNote(note)
    setEditText(note.text)
  }

  const cancelEditing = () => {
    setEditingNote(null)
    setEditText("")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white font-medium mb-4">Mes notes</h2>

        <div className="flex">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Ajouter une note..."
            className="flex-1 bg-[#1C1D33] border border-gray-700 rounded-l-md p-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#048B9A] resize-none"
            rows={3}
          />
          <Button
            onClick={handleAddNote}
            className="rounded-l-none bg-[#048B9A] hover:bg-[#037483]"
            disabled={!newNote.trim()}
          >
            Ajouter
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucune note pour le moment</p>
            <p className="text-gray-500 text-sm mt-2">
              Prenez des notes pour vous aider à retenir les concepts importants
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="bg-[#151627] border border-gray-800 rounded-md p-4">
              {editingNote && editingNote.id === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-[#1C1D33] border border-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-[#048B9A] resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-white hover:bg-[#151627]"
                      onClick={cancelEditing}
                    >
                      Annuler
                    </Button>
                    <Button size="sm" className="bg-[#048B9A] hover:bg-[#037483]" onClick={handleUpdateNote}>
                      Enregistrer
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 mb-3 whitespace-pre-wrap">{note.text}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{formatDate(note.timestamp)}</span>
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => startEditing(note)}
                      >
                        Modifier
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        onClick={() => onDeleteNote(note.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
})

// Discussion component
const Discussion = React.memo(({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now(),
        text: newComment,
        user: {
          name: "Vous",
          avatar: "/placeholder.svg?height=50&width=50",
          isCurrentUser: true,
        },
        timestamp: new Date().toISOString(),
        likes: 0,
      })
      setNewComment("")
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white font-medium mb-4">Discussion</h2>

        <div className="flex">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Poser une question ou partager un commentaire..."
            className="flex-1 bg-[#1C1D33] border border-gray-700 rounded-l-md p-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#048B9A] resize-none"
            rows={3}
          />
          <Button
            onClick={handleAddComment}
            className="rounded-l-none bg-[#048B9A] hover:bg-[#037483]"
            disabled={!newComment.trim()}
          >
            Publier
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucun commentaire pour le moment</p>
            <p className="text-gray-500 text-sm mt-2">
              Soyez le premier à poser une question ou à partager un commentaire
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-[#151627] border border-gray-800 rounded-md p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="font-medium text-white">{comment.user.name}</span>
                    {comment.user.isCurrentUser && (
                      <Badge className="ml-2 bg-[#048B9A]/20 text-[#048B9A] hover:bg-[#048B9A]/30 text-xs">Vous</Badge>
                    )}
                    {comment.user.isInstructor && (
                      <Badge className="ml-2 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 text-xs">
                        Formateur
                      </Badge>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">{formatDate(comment.timestamp)}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-3">{comment.text}</p>

              <div className="flex justify-between items-center">
                <button className="text-gray-400 hover:text-[#048B9A] transition-colors flex items-center">
                  <FaRegCommentDots className="mr-1" /> Répondre
                </button>
                <div className="flex items-center">
                  <button className="text-gray-400 hover:text-[#048B9A] transition-colors">👍 {comment.likes}</button>
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-800 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-[#1C1D33] rounded-md p-3">
                      <div className="flex items-start space-x-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                          <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <span className="font-medium text-white">{reply.user.name}</span>
                            {reply.user.isInstructor && (
                              <Badge className="ml-2 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 text-xs">
                                Formateur
                              </Badge>
                            )}
                          </div>
                          <span className="text-gray-500 text-xs">{formatDate(reply.timestamp)}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-2">{reply.text}</p>

                      <div className="flex justify-end">
                        <button className="text-gray-400 hover:text-[#048B9A] transition-colors">
                          👍 {reply.likes}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
})

// Resources component
const Resources = ({ resources }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white font-medium mb-4">Ressources du cours</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {resources.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">Aucune ressource disponible</p>
          </div>
        ) : (
          resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-[#151627] border border-gray-800 rounded-md p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                {resource.type === "pdf" ? (
                  <div className="w-10 h-10 bg-red-500/20 rounded-md flex items-center justify-center mr-3">
                    <FaRegFileAlt className="text-red-500" />
                  </div>
                ) : resource.type === "code" ? (
                  <div className="w-10 h-10 bg-blue-500/20 rounded-md flex items-center justify-center mr-3">
                    <FaCode className="text-blue-500" />
                  </div>
                ) : resource.type === "image" ? (
                  <div className="w-10 h-10 bg-green-500/20 rounded-md flex items-center justify-center mr-3">
                    <FaImage className="text-green-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-500/20 rounded-md flex items-center justify-center mr-3">
                    <FaFile className="text-gray-500" />
                  </div>
                )}

                <div>
                  <h3 className="text-white font-medium">{resource.title}</h3>
                  <p className="text-gray-400 text-sm">{resource.size}</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-white hover:bg-[#151627]"
                onClick={() => window.open(resource.url, "_blank")}
              >
                <FaDownload className="mr-2" /> Télécharger
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Main component
export default function CoursePlayerPage() {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isLessonCompleted, setIsLessonCompleted] = useState(false)
  const [notes, setNotes] = useState([])
  const [comments, setComments] = useState([])
  const [bookmarked, setBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState("content")

  // Sample course data
  const course = {
    id: 1,
    title: "Développement Web Fullstack avec React et Node.js",
    instructor: {
      name: "Marie Dupont",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    progress: 35,
    chapters: [
      {
        title: "Introduction au développement web fullstack",
        duration: "3h 45min",
        isCompleted: true,
        isLocked: false,
        lessons: [
          {
            title: "Bienvenue au cours",
            duration: "5:22",
            type: "video",
            isCompleted: true,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Bienvenue à ce cours complet sur le développement web fullstack avec React et Node.js. Dans cette formation, vous apprendrez à créer des applications web complètes, de la conception de l'interface utilisateur à la mise en place d'une API robuste et d'une base de données.",
            resources: [
              {
                id: 1,
                title: "Guide de démarrage",
                type: "pdf",
                size: "1.2 MB",
                url: "#",
              },
              {
                id: 2,
                title: "Présentation du cours",
                type: "pdf",
                size: "3.5 MB",
                url: "#",
              },
            ],
          },
          {
            title: "Configuration de l'environnement de développement",
            duration: "15:47",
            type: "video",
            isCompleted: true,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Dans cette leçon, nous allons configurer notre environnement de développement pour travailler efficacement avec React et Node.js. Nous installerons Node.js, npm, et les outils de développement essentiels.",
            resources: [
              {
                id: 3,
                title: "Checklist d'installation",
                type: "pdf",
                size: "0.8 MB",
                url: "#",
              },
            ],
          },
          {
            title: "Vue d'ensemble des technologies web modernes",
            duration: "12:33",
            type: "video",
            isCompleted: true,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Cette leçon présente un aperçu des technologies web modernes que nous utiliserons dans ce cours, notamment React, Node.js, Express, et MongoDB. Nous discuterons de leur rôle dans le développement web fullstack et de la façon dont elles s'intègrent ensemble.",
          },
        ],
      },
      {
        title: "Fondamentaux de JavaScript moderne (ES6+)",
        duration: "5h 20min",
        isCompleted: false,
        isLocked: false,
        lessons: [
          {
            title: "Variables, types et structures de données",
            duration: "22:15",
            type: "video",
            isCompleted: false,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Dans cette leçon, nous explorerons les fondamentaux de JavaScript moderne, en commençant par les variables, les types de données et les structures de données. Nous verrons comment utiliser let, const, et les différentes façons de travailler avec les objets et les tableaux.",
          },
          {
            title: "Fonctions et portée en JavaScript",
            duration: "18:42",
            type: "video",
            isCompleted: false,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Cette leçon couvre les fonctions en JavaScript, y compris les déclarations de fonctions, les expressions de fonctions, et les fonctions fléchées. Nous discuterons également de la portée des variables et du concept de fermeture (closure).",
          },
          {
            title: "Quiz: Concepts fondamentaux de JavaScript",
            duration: "10:00",
            type: "quiz",
            isCompleted: false,
            isLocked: false,
            content:
              "Ce quiz teste votre compréhension des concepts fondamentaux de JavaScript que nous avons couverts jusqu'à présent.",
          },
        ],
      },
      {
        title: "React - Les fondamentaux",
        duration: "6h 15min",
        isCompleted: false,
        isLocked: false,
        lessons: [
          {
            title: "Introduction à React et JSX",
            duration: "20:15",
            type: "video",
            isCompleted: false,
            isLocked: false,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Cette leçon introduit React, une bibliothèque JavaScript pour construire des interfaces utilisateur. Nous découvrirons JSX, une extension de syntaxe pour JavaScript qui ressemble à HTML et facilite la création d'éléments React.",
          },
        ],
      },
      {
        title: "Node.js et Express",
        duration: "5h 50min",
        isCompleted: false,
        isLocked: true,
        lessons: [
          {
            title: "Introduction à Node.js",
            duration: "18:15",
            type: "video",
            isCompleted: false,
            isLocked: true,
            videoSrc: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            poster: "/placeholder.svg?height=400&width=800",
            content:
              "Cette leçon introduit Node.js, un environnement d'exécution JavaScript côté serveur. Nous verrons comment Node.js fonctionne et comment il peut être utilisé pour créer des applications serveur.",
          },
        ],
      },
    ],
    sampleComments: [
      {
        id: 1,
        text: "Cette leçon était vraiment claire et bien expliquée. J'ai enfin compris comment configurer correctement mon environnement de développement !",
        user: {
          name: "Thomas Martin",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        timestamp: "2025-03-15T14:30:00Z",
        likes: 5,
        replies: [
          {
            id: 101,
            text: "Merci pour votre commentaire positif ! N'hésitez pas si vous avez des questions sur la configuration.",
            user: {
              name: "Marie Dupont",
              avatar: "/placeholder.svg?height=50&width=50",
              isInstructor: true,
            },
            timestamp: "2025-03-15T15:45:00Z",
            likes: 2,
          },
        ],
      },
      {
        id: 2,
        text: "J'ai rencontré un problème lors de l'installation de Node.js sur Windows. Quelqu'un pourrait-il m'aider ?",
        user: {
          name: "Sophie Leclerc",
          avatar: "/placeholder.svg?height=50&width=50",
        },
        timestamp: "2025-03-14T10:20:00Z",
        likes: 0,
        replies: [
          {
            id: 102,
            text: "Bonjour Sophie, pouvez-vous préciser le message d'erreur que vous recevez ? Généralement, il suffit de télécharger l'installateur depuis le site officiel et de suivre les instructions.",
            user: {
              name: "Alexandre Dubois",
              avatar: "/placeholder.svg?height=50&width=50",
            },
            timestamp: "2025-03-14T11:05:00Z",
            likes: 1,
          },
          {
            id: 103,
            text: "Sophie, j'ai ajouté une ressource supplémentaire dans la section 'Ressources' qui traite spécifiquement des problèmes d'installation sur Windows. Jetez-y un coup d'œil et faites-moi savoir si cela résout votre problème.",
            user: {
              name: "Marie Dupont",
              avatar: "/placeholder.svg?height=50&width=50",
              isInstructor: true,
            },
            timestamp: "2025-03-14T13:30:00Z",
            likes: 3,
          },
        ],
      },
    ],
  }

  // Get current lesson data
  const currentLessonData = course.chapters[currentChapter]?.lessons[currentLesson]

  // Handle lesson selection
  const handleSelectLesson = useCallback(
    (chapterIndex, lessonIndex) => {
      setCurrentChapter(chapterIndex)
      setCurrentLesson(lessonIndex)
      setIsLessonCompleted(course.chapters[chapterIndex].lessons[lessonIndex].isCompleted)
      setActiveTab("content")

      // On mobile, close the sidebar after selecting a lesson
      setIsMobileSidebarOpen(false)
    },
    [course.chapters],
  )

  // Handle lesson completion
  const handleCompleteLesson = useCallback(() => {
    setIsLessonCompleted(true)

    // Update the course data (in a real app, this would be an API call)
    const updatedCourse = { ...course }
    updatedCourse.chapters[currentChapter].lessons[currentLesson].isCompleted = true

    // Check if all lessons in the chapter are completed
    const allLessonsCompleted = updatedCourse.chapters[currentChapter].lessons.every((lesson) => lesson.isCompleted)
    if (allLessonsCompleted) {
      updatedCourse.chapters[currentChapter].isCompleted = true
    }

    // Calculate new progress
    const totalLessons = updatedCourse.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)
    const completedLessons = updatedCourse.chapters.reduce((total, chapter) => {
      return total + chapter.lessons.filter((lesson) => lesson.isCompleted).length
    }, 0)

    updatedCourse.progress = Math.round((completedLessons / totalLessons) * 100)

    // In a real app, you would update the state with the updated course data
  }, [course, currentChapter, currentLesson])

  // Handle video completion
  const handleVideoComplete = () => {
    if (!isLessonCompleted) {
      handleCompleteLesson()
    }
  }

  // Handle next lesson
  const handleNextLesson = useCallback(() => {
    const currentChapterLessons = course.chapters[currentChapter].lessons

    if (currentLesson < currentChapterLessons.length - 1) {
      // Go to next lesson in current chapter
      handleSelectLesson(currentChapter, currentLesson + 1)
    } else if (currentChapter < course.chapters.length - 1) {
      // Go to first lesson of next chapter
      const nextChapter = currentChapter + 1
      if (!course.chapters[nextChapter].isLocked) {
        handleSelectLesson(nextChapter, 0)
      }
    }
  }, [course.chapters, currentChapter, currentLesson, handleSelectLesson])

  // Handle previous lesson
  const handlePreviousLesson = useCallback(() => {
    if (currentLesson > 0) {
      // Go to previous lesson in current chapter
      handleSelectLesson(currentChapter, currentLesson - 1)
    } else if (currentChapter > 0) {
      // Go to last lesson of previous chapter
      const prevChapter = currentChapter - 1
      const lastLessonIndex = course.chapters[prevChapter].lessons.length - 1
      handleSelectLesson(prevChapter, lastLessonIndex)
    }
  }, [course.chapters, currentChapter, currentLesson, handleSelectLesson])

  // Handle add note
  const handleAddNote = (note) => {
    setNotes([note, ...notes])
  }

  // Handle update note
  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  // Handle delete note
  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  // Handle add comment
  const handleAddComment = (comment) => {
    setComments([comment, ...comments])
  }

  // Initialize comments from sample data
  useEffect(() => {
    setComments(course.sampleComments || [])
  }, [course.sampleComments])

  // Missing icons
  const FaCode = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={className} fill="currentColor">
      <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3-12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z" />
    </svg>
  )

  const FaImage = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z" />
    </svg>
  )

  const FaFile = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className={className} fill="currentColor">
      <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
    </svg>
  )

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-[#0A0B1C] flex flex-col">
        {/* Header */}
        <header className="bg-[#151627] border-b border-gray-800 py-3 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/formations" className="text-white hover:text-[#048B9A] transition-colors mr-4">
                <FaArrowLeft className="w-5 h-5" />
              </Link>

              <div>
                <h1 className="text-white font-medium text-lg">{course.title}</h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>Par {course.instructor.name}</span>
                  <span className="mx-2">•</span>
                  <span>{course.progress}% terminé</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-[#1C1D33]"
                      onClick={() => setBookmarked(!bookmarked)}
                    >
                      {bookmarked ? (
                        <FaBookmark className="w-5 h-5 text-[#048B9A]" />
                      ) : (
                        <FaRegBookmark className="w-5 h-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{bookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1C1D33]">
                      <FaCog className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Paramètres</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Link href="/">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#1C1D33]">
                  <FaHome className="w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-[#1C1D33] lg:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <FaBars className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (desktop) */}
          <Sidebar className="hidden lg:block w-80 border-r border-gray-800 bg-[#151627]" collapsible="offcanvas">
            <SidebarContent>
              <CourseNavigation
                chapters={course.chapters}
                currentChapter={currentChapter}
                currentLesson={currentLesson}
                onSelectLesson={handleSelectLesson}
                progress={course.progress}
              />
            </SidebarContent>
            <SidebarTrigger className="absolute top-4 right-4" />
          </Sidebar>

          {/* Mobile sidebar */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />

                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ type: "spring", damping: 30 }}
                  className="fixed top-0 left-0 bottom-0 w-80 bg-[#151627] z-50 lg:hidden"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-white font-medium">Contenu du cours</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <FaTimes className="w-5 h-5" />
                    </Button>
                  </div>

                  <CourseNavigation
                    chapters={course.chapters}
                    currentChapter={currentChapter}
                    currentLesson={currentLesson}
                    onSelectLesson={handleSelectLesson}
                    progress={course.progress}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                {/* Lesson title and navigation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">
                      Chapitre {currentChapter + 1}: {course.chapters[currentChapter].title}
                    </div>
                    <h2 className="text-white text-xl font-medium">{currentLessonData.title}</h2>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-[#151627]"
                      onClick={handlePreviousLesson}
                      disabled={currentChapter === 0 && currentLesson === 0}
                    >
                      <FaChevronLeft className="mr-2" /> Précédent
                    </Button>

                    <Button
                      className="bg-[#048B9A] hover:bg-[#037483] text-white"
                      onClick={handleNextLesson}
                      disabled={
                        currentChapter === course.chapters.length - 1 &&
                        currentLesson === course.chapters[currentChapter].lessons.length - 1
                      }
                    >
                      Suivant <FaChevronRight className="ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Lesson content */}
                <div className="bg-[#151627] border border-gray-800 rounded-lg overflow-hidden mb-6">
                  {/* Video player (if lesson is video type) */}
                  {currentLessonData.type === "video" && (
                    <VideoPlayer
                      videoSrc={currentLessonData.videoSrc}
                      poster={currentLessonData.poster}
                      onComplete={handleVideoComplete}
                    />
                  )}

                  {/* Tabs for content, notes, discussion, resources */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
                    <TabsList className="bg-[#1C1D33] border border-gray-800 p-1 mb-6">
                      <TabsTrigger
                        value="content"
                        className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                      >
                        Contenu
                      </TabsTrigger>
                      <TabsTrigger
                        value="notes"
                        className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                      >
                        Notes
                      </TabsTrigger>
                      <TabsTrigger
                        value="discussion"
                        className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                      >
                        Discussion
                      </TabsTrigger>
                      <TabsTrigger
                        value="resources"
                        className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                      >
                        Ressources
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300">{currentLessonData.content}</p>

                        {!isLessonCompleted && currentLessonData.type !== "video" && (
                          <div className="mt-8">
                            <Button
                              className="bg-[#048B9A] hover:bg-[#037483] text-white"
                              onClick={handleCompleteLesson}
                            >
                              Marquer comme terminé
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="h-[400px]">
                      <Notes
                        notes={notes}
                        onAddNote={handleAddNote}
                        onUpdateNote={handleUpdateNote}
                        onDeleteNote={handleDeleteNote}
                      />
                    </TabsContent>

                    <TabsContent value="discussion" className="h-[400px]">
                      <Discussion comments={comments} onAddComment={handleAddComment} />
                    </TabsContent>

                    <TabsContent value="resources" className="h-[400px]">
                      <Resources resources={currentLessonData.resources || []} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Footer with progress */}
            <div className="bg-[#151627] border-t border-gray-800 py-3 px-4">
              <div className="container mx-auto flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <div className="w-full sm:w-48 mr-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-sm">Progression du cours</span>
                      <span className="text-[#048B9A] text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5 bg-gray-700" />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {isLessonCompleted ? (
                    <div className="flex items-center text-green-500">
                      <FaCheck className="mr-2" /> Leçon terminée
                    </div>
                  ) : (
                    <Button className="bg-[#048B9A] hover:bg-[#037483] text-white" onClick={handleCompleteLesson}>
                      Marquer comme terminé
                    </Button>
                  )}

                  <Button
                    className="bg-[#048B9A] hover:bg-[#037483] text-white"
                    onClick={handleNextLesson}
                    disabled={
                      currentChapter === course.chapters.length - 1 &&
                      currentLesson === course.chapters[currentChapter].lessons.length - 1
                    }
                  >
                    Suivant <FaChevronRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

