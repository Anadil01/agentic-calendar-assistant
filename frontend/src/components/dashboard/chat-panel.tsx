"use client";

import {
  ArrowUp,
  Check,
  LoaderCircle,
  Menu,
  MessageSquarePlus,
  Sparkles,
  X,
} from "lucide-react";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  confirmPendingAction,
  listThreads,
  loadThread,
  rejectPendingAction,
  streamAgentChat,
  ThreadSummary,
} from "@/lib/agent";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { MarkdownMessage } from "./markdown-message";

const styles = {
  /*
   * ============================================================
   * APP SHELL
   * ============================================================
   */

  root: "flex h-svh w-full overflow-hidden",

  /*
   * ============================================================
   * MOBILE OVERLAY
   * ============================================================
   */

  overlay:
    "fixed inset-0 z-30 bg-foreground/20 backdrop-blur-[2px] md:hidden",

  /*
   * ============================================================
   * SIDEBAR
   * ============================================================
   */

  aside:
    "fixed inset-y-0 left-0 z-40 flex w-[18.5rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-200 ease-out md:static md:translate-x-0",

  asideOpen: "translate-x-0",

  asideClosed: "-translate-x-full",

  brandRow:
    "flex items-center justify-between gap-2 px-4 pb-3 pt-4",

  brandLeft:
    "flex min-w-0 items-center gap-2.5",

  brandIcon:
    "flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground",

  brandIconSvg: "size-4",

  brandText: "min-w-0",

  brandTitle:
    "font-heading text-lg font-semibold tracking-tight",

  brandSubtitle:
    "truncate text-xs text-muted-foreground",

  mobileCloseBtn:
    "size-9 shrink-0 md:hidden",

  topActions:
    "space-y-3 px-3 pb-3",

  newChatBtn:
    "w-full justify-start gap-2 rounded-xl border-sidebar-border bg-card/70 text-sm",

  newChatIcon:
    "size-4",

  separator:
    "opacity-70",

  chatsSection:
    "flex min-h-0 flex-1 flex-col px-2 pt-3",

  chatsTitle:
    "mb-2 px-2 text-sm font-semibold text-sidebar-foreground",

  chatsScroll:
    "min-h-0 flex-1 px-1 pb-3",

  chatsEmpty:
    "px-2 py-3 text-sm leading-relaxed text-muted-foreground",

  threadList:
    "space-y-1",

  threadBtn:
    "w-full rounded-xl px-3 py-2.5 text-left transition-colors disabled:opacity-50",

  threadBtnActive:
    "bg-sidebar-accent text-sidebar-accent-foreground",

  threadBtnIdle:
    "hover:bg-sidebar-accent/60",

  threadTitle:
    "line-clamp-2 text-sm font-medium leading-snug",

  threadTime:
    "mt-1 block text-xs text-muted-foreground",

  footer:
    "mt-auto border-t border-sidebar-border p-3",

  /*
   * ============================================================
   * MAIN
   * ============================================================
   */

  main:
    "relative flex min-w-0 flex-1 flex-col",

  header:
    "flex h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-background/50 px-3 backdrop-blur-md sm:gap-3 sm:px-5",

  mobileMenuBtn:
    "size-9 shrink-0 md:hidden",

  menuIcon:
    "size-5",

  headerText:
    "min-w-0",

  headerTitle:
    "truncate text-sm font-semibold sm:text-base",

  headerSubtitle:
    "truncate text-xs text-muted-foreground sm:text-sm",

  /*
   * ============================================================
   * CHAT
   * ============================================================
   */

  chatColumn:
    "relative flex min-h-0 flex-1 flex-col",

  messagesScroll:
    "h-full min-h-0 flex-1",

  messagesInner:
    "mx-auto w-full max-w-3xl px-3 py-5 sm:px-6 sm:py-8",

  /*
   * ============================================================
   * EMPTY STATE
   * ============================================================
   */

  emptyState:
    "flex min-h-[52vh] flex-col items-center justify-center px-2 text-center",

  emptyIcon:
    "mb-5 flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground",

  emptyIconSvg:
    "size-6",

  emptyTitle:
    "font-heading text-2xl font-semibold tracking-tight sm:text-4xl",

  emptyCopy:
    "mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",

  suggestions:
    "mt-6 flex w-full flex-col items-stretch gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center",

  suggestionBtn:
    "h-auto min-h-9 whitespace-normal rounded-xl border-border/80 bg-card/80 px-3 py-2 text-left text-[13px] leading-5 sm:w-auto sm:rounded-full sm:text-center",

  /*
   * ============================================================
   * MESSAGES
   * ============================================================
   */

  messageList:
    "space-y-6",

  statusRow:
    "flex items-center gap-2 text-sm text-muted-foreground",

  statusIcon:
    "size-4 animate-spin",

  statusIconSm:
    "size-3.5 animate-spin",

  messageRow:
    "message-enter flex w-full min-w-0",

  messageRowUser:
    "justify-end",

  messageRowAssistant:
    "justify-start",

  bubble:
    "min-w-0 max-w-[92%] overflow-hidden break-words [overflow-wrap:anywhere] sm:max-w-[min(100%,42rem)]",

  bubbleUser:
    "rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground",

  bubbleAssistant:
    "rounded-2xl rounded-bl-md bg-card px-4 py-3 text-foreground ring-1 ring-primary/15",

  bubbleSystem:
    "rounded-2xl bg-muted px-4 py-2.5 text-muted-foreground",

  thinking:
    "inline-flex items-center gap-2 text-sm text-muted-foreground",

  userText:
    "whitespace-pre-wrap text-[15px] leading-7",

  /*
   * ============================================================
   * APPROVAL CARD
   * ============================================================
   */

  approvalCard:
    "mt-4 rounded-xl border border-border bg-background/70 p-3.5 sm:p-4",

  approvalTitle:
    "flex items-center gap-2 text-sm font-semibold",

  approvalIcon:
    "flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted",

  approvalIconSvg:
    "size-4",

  approvalDescription:
    "mt-2 text-xs leading-relaxed text-muted-foreground",

  approvalActions:
    "mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap",

  approvalButton:
    "w-full gap-2 rounded-lg sm:w-auto",

  approvalButtonIcon:
    "size-3.5",

  approvalStatus:
    "mt-3 text-sm text-muted-foreground",

  /*
   * ============================================================
   * COMPOSER
   * ============================================================
   */

  composerWrap:
    "shrink-0 border-t border-border/60 bg-background/70 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-4",

  composerForm:
    "composer-glow mx-auto flex w-full max-w-3xl items-end gap-1.5 rounded-2xl border border-border/80 bg-card p-2 sm:gap-2 sm:p-2.5",

  composerInput:
    "max-h-40 min-h-[44px] flex-1 resize-none border-0 bg-transparent px-2.5 py-2.5 text-[15px] shadow-none focus-visible:ring-0 sm:px-3",

  sendBtn:
    "mb-0.5 size-10 shrink-0 rounded-xl",

  sendIcon:
    "size-4",

  sendIconSpin:
    "size-4 animate-spin",

  composerHint:
    "mx-auto mt-2.5 max-w-3xl text-center text-[11px] text-muted-foreground",
} as const;

type Props = {
  sessionToken: string;
  connections?: ReactNode;
  footer?: ReactNode;
};

type Approval = {
  actionId: string;
  actionType: string;
  eventId: string;
  expiresAt: string;
};

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  approval?: Approval;
  approvalStatus?:
    | "pending"
    | "approved"
    | "rejected"
    | "expired";
};

const WELCOME =
  "Connect Google Calendar, then ask about today's agenda, create a Meet, or reschedule something.";

const SUGGESTIONS = [
  "What's on today?",
  "What's on tomorrow?",
  "Find a free slot tomorrow morning",
  "Create a 30-minute meeting tomorrow at 10am",
];

function WelcomeMessage(): Message {
  return {
    id: "welcome",
    role: "assistant",
    content: WELCOME,
  };
}

function ChatPanel({
  sessionToken,
  connections,
  footer,
}: Props) {
  /*
   * ============================================================
   * STATE
   * ============================================================
   */

  const [threadId, setThreadId] = useState(() =>
    crypto.randomUUID(),
  );

  const [messages, setMessages] = useState<Message[]>([
    WelcomeMessage(),
  ]);

  const [threads, setThreads] = useState<ThreadSummary[]>([]);

  const [prompt, setPrompt] = useState("");

  const [running, setRunning] = useState(false);

  const [loadingThread, setLoadingThread] =
    useState(false);

  const [progress, setProgress] =
    useState<string | null>(null);

  const [approvalLoading, setApprovalLoading] =
    useState<string | null>(null);

  /*
   * Mobile sidebar state
   */
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const showEmpty =
    messages.length === 1 &&
    messages[0]?.id === "welcome" &&
    !running;

  const bottomRef =
    useRef<HTMLDivElement>(null);

  /*
   * ============================================================
   * THREADS
   * ============================================================
   */

  const refreshThreads = useCallback(async () => {
    try {
      const data =
        await listThreads(sessionToken);

      setThreads(data.threads);
    } catch {
      // Keep current thread list if refresh fails.
    }
  }, [sessionToken]);

  useEffect(() => {
    refreshThreads();
  }, [refreshThreads]);

  /*
   * ============================================================
   * AUTO SCROLL
   * ============================================================
   */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, progress]);

  /*
   * ============================================================
   * NEW CHAT
   * ============================================================
   */

  function startNewChat() {
    if (
      running ||
      loadingThread ||
      approvalLoading
    ) {
      return;
    }

    setThreadId(crypto.randomUUID());

    setMessages([
      WelcomeMessage(),
    ]);

    setPrompt("");

    setProgress(null);

    /*
     * Important for mobile:
     * close sidebar after creating a chat.
     */
    setSidebarOpen(false);
  }

  /*
   * ============================================================
   * RESUME CHAT
   * ============================================================
   */

  async function resumeThread(
    nextThreadId: string,
  ) {
    if (
      running ||
      loadingThread ||
      approvalLoading ||
      nextThreadId === threadId
    ) {
      return;
    }

    setLoadingThread(true);

    setProgress(null);

    try {
      const data =
        await loadThread(
          sessionToken,
          nextThreadId,
        );

      setThreadId(data.threadId);

      setMessages(
        data.messages.length > 0
          ? data.messages
          : [WelcomeMessage()],
      );

      setPrompt("");

      /*
       * Close mobile sidebar after selecting chat.
       */
      setSidebarOpen(false);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            "Could not load the chat",
        },
      ]);
    } finally {
      setLoadingThread(false);
    }
  }

  /*
   * ============================================================
   * CONFIRM CANCELLATION
   * ============================================================
   */

  async function confirmCancellation(
    messageId: string,
    actionId: string,
  ) {
    if (approvalLoading) {
      return;
    }

    setApprovalLoading(actionId);

    try {
      await confirmPendingAction(
        sessionToken,
        actionId,
      );

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                approvalStatus:
                  "approved",
                content:
                  message.content ||
                  "The meeting has been cancelled successfully.",
              }
            : message,
        ),
      );

      await refreshThreads();
    } catch (error) {
      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content:
                  error instanceof Error
                    ? error.message
                    : "Could not cancel the meeting.",
              }
            : message,
        ),
      );
    } finally {
      setApprovalLoading(null);
    }
  }

  /*
   * ============================================================
   * REJECT CANCELLATION
   * ============================================================
   */

  async function rejectCancellation(
    messageId: string,
    actionId: string,
  ) {
    if (approvalLoading) {
      return;
    }

    setApprovalLoading(actionId);

    try {
      await rejectPendingAction(
        sessionToken,
        actionId,
      );

      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                approvalStatus:
                  "rejected",
              }
            : message,
        ),
      );
    } catch (error) {
      setMessages((current) =>
        current.map((message) =>
          message.id === messageId
            ? {
                ...message,
                content:
                  error instanceof Error
                    ? error.message
                    : "Could not reject the cancellation.",
              }
            : message,
        ),
      );
    } finally {
      setApprovalLoading(null);
    }
  }

  /*
   * ============================================================
   * SEND MESSAGE
   * ============================================================
   */

  async function sendMessage(text: string) {
    const trimmed = text.trim();

    if (
      !trimmed ||
      running ||
      loadingThread ||
      approvalLoading
    ) {
      return;
    }

    const assistantId =
      crypto.randomUUID();

    setMessages((current) => [
      ...current,

      {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      },

      {
        id: assistantId,
        role: "assistant",
        content: "",
      },
    ]);

    setPrompt("");

    setRunning(true);

    setProgress(null);

    try {
      await streamAgentChat(
        sessionToken,
        {
          message: trimmed,
          threadId,
        },
        (event) => {
          /*
           * Tool progress
           */
          if (
            event.type === "progress" &&
            event.message
          ) {
            setProgress(event.message);
          }

          /*
           * Cancellation approval
           */
          if (
            event.type ===
              "approval_required" &&
            event.approval
          ) {
            setProgress(null);

            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      approval:
                        event.approval,
                      approvalStatus:
                        "pending",
                    }
                  : message,
              ),
            );
          }

          /*
           * Streaming text
           */
          if (
            event.type === "token" &&
            event.token
          ) {
            setProgress(null);

            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      content:
                        message.content +
                        event.token,
                    }
                  : message,
              ),
            );
          }

          /*
           * Agent error
           */
          if (
            event.type === "error"
          ) {
            setProgress(null);

            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      content:
                        event.message ??
                        "Agent failed",
                    }
                  : message,
              ),
            );
          }
        },
      );

      await refreshThreads();
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "system",
          content:
            "Could not reach the agent API",
        },
      ]);
    } finally {
      setRunning(false);
      setProgress(null);
    }
  }

  /*
   * ============================================================
   * FORM
   * ============================================================
   */

  function onSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    sendMessage(prompt);
  }

  function onKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage(prompt);
    }
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className={styles.root}>

      {/* ======================================================
          MOBILE OVERLAY
          ====================================================== */}

      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className={styles.overlay}
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      ) : null}

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside
        className={cn(
          styles.aside,
          sidebarOpen
            ? styles.asideOpen
            : styles.asideClosed,
        )}
      >
        {/* Brand */}
        <div className={styles.brandRow}>
          <div className={styles.brandLeft}>
            <div
              className={styles.brandIcon}
            >
              <Sparkles
                className={
                  styles.brandIconSvg
                }
              />
            </div>

            <div
              className={styles.brandText}
            >
              <p
                className={
                  styles.brandTitle
                }
              >
                Meet Agent
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className={
              styles.mobileCloseBtn
            }
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Top actions */}
        <div
          className={
            styles.topActions
          }
        >
          <Button
            onClick={startNewChat}
            variant="outline"
            className={
              styles.newChatBtn
            }
            disabled={
              running ||
              loadingThread ||
              Boolean(approvalLoading)
            }
          >
            <MessageSquarePlus
              className={
                styles.newChatIcon
              }
            />

            New Chat
          </Button>

          {connections}
        </div>

        <Separator
          className={
            styles.separator
          }
        />

        {/* Chats */}
        <div
          className={
            styles.chatsSection
          }
        >
          <p
            className={
              styles.chatsTitle
            }
          >
            Chats
          </p>

          <ScrollArea
            className={
              styles.chatsScroll
            }
          >
            {threads.length === 0 ? (
              <p
                className={
                  styles.chatsEmpty
                }
              >
                No chats yet. Start one
                and it will show up here.
              </p>
            ) : (
              <div
                className={
                  styles.threadList
                }
              >
                {threads.map(
                  (thread) => {
                    const active =
                      thread.id ===
                      threadId;

                    return (
                      <button
                        key={thread.id}
                        type="button"
                        disabled={
                          running ||
                          loadingThread ||
                          Boolean(
                            approvalLoading,
                          )
                        }
                        onClick={() =>
                          resumeThread(
                            thread.id,
                          )
                        }
                        className={cn(
                          styles.threadBtn,
                          active
                            ? styles.threadBtnActive
                            : styles.threadBtnIdle,
                        )}
                      >
                        <span
                          className={
                            styles.threadTitle
                          }
                        >
                          {thread.title}
                        </span>

                        <span
                          className={
                            styles.threadTime
                          }
                        >
                          {thread.updatedAt}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            )}
          </ScrollArea>
        </div>

        <Separator
          className={
            styles.separator
          }
        />

        {/* Footer */}
        <div
          className={
            styles.footer
          }
        >
          {footer}
        </div>
      </aside>

      {/* ======================================================
          MAIN CONTENT
          ====================================================== */}

      <section
        className={styles.main}
      >
        {/* Header */}
        <header
          className={styles.header}
        >
          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className={
              styles.mobileMenuBtn
            }
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open sidebar"
          >
            <Menu
              className={
                styles.menuIcon
              }
            />
          </Button>

          <div
            className={
              styles.headerText
            }
          >
            <p
              className={
                styles.headerTitle
              }
            >
              Assistant
            </p>

            <p
              className={
                styles.headerSubtitle
              }
            >
              Schedule, reschedule,
              and brief your day
            </p>
          </div>
        </header>

        {/* Chat column */}
        <div
          className={
            styles.chatColumn
          }
        >
          <ScrollArea
            className={
              styles.messagesScroll
            }
          >
            <div
              className={
                styles.messagesInner
              }
            >
              {/* =================================================
                  EMPTY STATE
                  ================================================= */}

              {showEmpty ? (
                <div
                  className={
                    styles.emptyState
                  }
                >
                  <div
                    className={
                      styles.emptyIcon
                    }
                  >
                    <Sparkles
                      className={
                        styles.emptyIconSvg
                      }
                    />
                  </div>

                  <h2
                    className={
                      styles.emptyTitle
                    }
                  >
                    Meeting Assistant
                  </h2>

                  <p
                    className={
                      styles.emptyCopy
                    }
                  >
                    {WELCOME}
                  </p>

                  <div
                    className={
                      styles.suggestions
                    }
                  >
                    {SUGGESTIONS.map(
                      (
                        suggestion,
                      ) => (
                        <Button
                          key={
                            suggestion
                          }
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            sendMessage(
                              suggestion,
                            )
                          }
                          className={
                            styles.suggestionBtn
                          }
                          disabled={
                            running ||
                            loadingThread ||
                            Boolean(
                              approvalLoading,
                            )
                          }
                        >
                          {
                            suggestion
                          }
                        </Button>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                /* ===============================================
                   MESSAGE LIST
                   =============================================== */

                <div
                  className={
                    styles.messageList
                  }
                >
                  {loadingThread ? (
                    <div
                      className={
                        styles.statusRow
                      }
                    >
                      <LoaderCircle
                        className={
                          styles.statusIcon
                        }
                      />

                      Loading Chat...
                    </div>
                  ) : (
                    messages.map(
                      (message) => {
                        /*
                         * Don't render welcome message
                         * once real messages exist.
                         */
                        if (
                          message.id ===
                            "welcome" &&
                          messages.length >
                            1
                        ) {
                          return null;
                        }

                        return (
                          <div
                            key={
                              message.id
                            }
                            className={cn(
                              styles.messageRow,
                              message.role ===
                                "user"
                                ? styles.messageRowUser
                                : styles.messageRowAssistant,
                            )}
                          >
                            <div
                              className={cn(
                                styles.bubble,
                                message.role ===
                                  "user" &&
                                  styles.bubbleUser,
                                message.role ===
                                  "assistant" &&
                                  styles.bubbleAssistant,
                                message.role ===
                                  "system" &&
                                  styles.bubbleSystem,
                              )}
                            >
                              {/* =================================
                                  THINKING
                                  ================================= */}

                              {!message.content &&
                              running ? (
                                <span
                                  className={
                                    styles.thinking
                                  }
                                >
                                  <LoaderCircle
                                    className={
                                      styles.statusIconSm
                                    }
                                  />

                                  Thinking...
                                </span>
                              ) : message.role ===
                                "user" ? (
                                /* ===============================
                                   USER MESSAGE
                                   =============================== */

                                <p
                                  className={
                                    styles.userText
                                  }
                                >
                                  {
                                    message.content
                                  }
                                </p>
                              ) : (
                                /* ===============================
                                   ASSISTANT MESSAGE
                                   =============================== */

                                <MarkdownMessage
                                  content={
                                    message.content
                                  }
                                  tone={
                                    message.role ===
                                      "system"
                                      ? "system"
                                      : "assistant"
                                  }
                                />
                              )}

                              {/* =================================
                                  APPROVAL CARD
                                  ================================= */}

                              {message.approval ? (
                                <div
                                  className={
                                    styles.approvalCard
                                  }
                                >
                                  <div
                                    className={
                                      styles.approvalTitle
                                    }
                                  >
                                    <span
                                      className={
                                        styles.approvalIcon
                                      }
                                    >
                                      {message.approvalStatus ===
                                      "approved" ? (
                                        <Check
                                          className={
                                            styles.approvalIconSvg
                                          }
                                        />
                                      ) : (
                                        <X
                                          className={
                                            styles.approvalIconSvg
                                          }
                                        />
                                      )}
                                    </span>

                                    <span>
                                      {message.approvalStatus ===
                                      "approved"
                                        ? "Cancellation confirmed"
                                        : message.approvalStatus ===
                                            "rejected"
                                          ? "Cancellation kept"
                                          : "Confirm cancellation"}
                                    </span>
                                  </div>

                                  <p
                                    className={
                                      styles.approvalDescription
                                    }
                                  >
                                    {message.approvalStatus ===
                                    "approved"
                                      ? "The meeting has been cancelled from your Google Calendar."
                                      : message.approvalStatus ===
                                          "rejected"
                                        ? "The meeting was not cancelled and remains on your Google Calendar."
                                        : "This meeting will be cancelled from your Google Calendar. Please confirm before continuing."}
                                  </p>

                                  {/* Pending buttons */}
                                  {message.approvalStatus ===
                                  "pending" ? (
                                    <div
                                      className={
                                        styles.approvalActions
                                      }
                                    >
                                      <Button
                                        type="button"
                                        size="sm"
                                        className={
                                          styles.approvalButton
                                        }
                                        disabled={
                                          approvalLoading !==
                                          null
                                        }
                                        onClick={() =>
                                          confirmCancellation(
                                            message.id,
                                            message
                                              .approval!
                                              .actionId,
                                          )
                                        }
                                      >
                                        {approvalLoading ===
                                        message
                                          .approval
                                          .actionId ? (
                                          <LoaderCircle
                                            className={cn(
                                              styles.approvalButtonIcon,
                                              "animate-spin",
                                            )}
                                          />
                                        ) : (
                                          <Check
                                            className={
                                              styles.approvalButtonIcon
                                            }
                                          />
                                        )}

                                        Confirm
                                        cancellation
                                      </Button>

                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className={
                                          styles.approvalButton
                                        }
                                        disabled={
                                          approvalLoading !==
                                          null
                                        }
                                        onClick={() =>
                                          rejectCancellation(
                                            message.id,
                                            message
                                              .approval!
                                              .actionId,
                                          )
                                        }
                                      >
                                        {approvalLoading ===
                                        message
                                          .approval
                                          .actionId ? (
                                          <LoaderCircle
                                            className={cn(
                                              styles.approvalButtonIcon,
                                              "animate-spin",
                                            )}
                                          />
                                        ) : (
                                          <X
                                            className={
                                              styles.approvalButtonIcon
                                            }
                                          />
                                        )}

                                        Keep meeting
                                      </Button>
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      },
                    )
                  )}

                  {/* Progress */}
                  {progress ? (
                    <div
                      className={
                        styles.statusRow
                      }
                    >
                      <LoaderCircle
                        className={
                          styles.statusIconSm
                        }
                      />

                      {progress}
                    </div>
                  ) : null}

                  <div
                    ref={bottomRef}
                  />
                </div>
              )}
            </div>
          </ScrollArea>

          {/* =====================================================
              COMPOSER
              ===================================================== */}

          <div
            className={
              styles.composerWrap
            }
          >
            <form
              onSubmit={onSubmit}
              className={
                styles.composerForm
              }
            >
              <Textarea
                value={prompt}
                onChange={(event) =>
                  setPrompt(
                    event.target.value,
                  )
                }
                rows={1}
                onKeyDown={onKeyDown}
                disabled={
                  running ||
                  loadingThread ||
                  Boolean(
                    approvalLoading,
                  )
                }
                placeholder="Ask about your calendar..."
                className={
                  styles.composerInput
                }
              />

              <Button
                type="submit"
                size="icon"
                disabled={
                  !prompt.trim() ||
                  running ||
                  loadingThread ||
                  Boolean(
                    approvalLoading,
                  )
                }
                className={
                  styles.sendBtn
                }
                aria-label="Send message"
              >
                {running ? (
                  <LoaderCircle
                    className={
                      styles.sendIconSpin
                    }
                  />
                ) : (
                  <ArrowUp
                    className={
                      styles.sendIcon
                    }
                  />
                )}
              </Button>
            </form>

            <p
              className={
                styles.composerHint
              }
            >
              Press Enter to send ·
              Shift + Enter for a new
              line
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChatPanel;