"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { getCommentByRecruitAndBrother, upsertComment, State } from "@/app/lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function CommentUpdateForm({
  recruitId,
  brotherId,
}: {
  recruitId: string;
  brotherId: string;
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(upsertComment, initialState);

  const [commentId, setCommentId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [redFlag, setRedFlag] = useState("");

  // Fetch comment data when component mounts
  useEffect(() => {
    async function fetchComment() {
      const existingComment = await getCommentByRecruitAndBrother(recruitId, brotherId);
      if (existingComment) {
        setCommentId(existingComment.id);
        setComment(existingComment.comment);
        setRedFlag(existingComment.red_flag || ""); // Default to empty string if null
      }
    }
    fetchComment();
  }, [recruitId, brotherId]);

  return (
    <form action={formAction} className="flex flex-col w-full bg-white text-black rounded-md p-10 max-md:p-6 shadow-lg">
      {/* Hidden Fields for IDs */}
      <input type="hidden" name="recruitId" value={recruitId} />
      <input type="hidden" name="brotherId" value={brotherId} />
      <input type="hidden" name="commentId" value={commentId || ""} />

      {/* Comments Field */}
      <label htmlFor="comment" className="mb-2 font-semibold text-lg">
        {commentId ? "Edit Comment" : "Add Comment"}
      </label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment..."
        className="rounded-md border border-gray-300 p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-brandRed"
        required
      />
      <div id="comment-error" aria-live="polite" aria-atomic="true">
        {state.errors?.comment &&
          state.errors.comment.map((error: string) => (
            <p className="mt-2 text-sm text-red-500 flex items-center" key={error}>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
              {error}
            </p>
          ))}
      </div>

      {/* Red Flags Field */}
      <label htmlFor="redFlag" className="mb-2 font-semibold text-lg">
        {commentId ? "Edit Red Flags (if none, type \"None\")" : "Add Red Flags (if none, type \"None\")"}
      </label>
      <input
        id="redFlag"
        name="redFlag"
        type="text"
        value={redFlag}
        onChange={(e) => setRedFlag(e.target.value)}
        placeholder="Enter any red flags..."
        className="rounded-md border border-gray-300 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-brandRed"
      />
      <div id="redFlag-error" aria-live="polite" aria-atomic="true">
        {state.errors?.redFlag &&
          state.errors.redFlag.map((error: string) => (
            <p className="mt-2 text-sm text-red-500 flex items-center" key={error}>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
              {error}
            </p>
          ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        aria-describedby="submit-error"
        className="bg-brandRed text-white py-2 rounded-md font-semibold hover:bg-black transition-colors"
      >
        {commentId ? "Update Comment" : "Submit Comment"}
      </button>

      {/* Submission Error Message */}
      <div className="flex h-8 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="text-sm text-red-500 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-1" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}