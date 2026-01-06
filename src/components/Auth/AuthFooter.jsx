import React from 'react'
import { Link } from 'react-router-dom';

export default function AuthFooter({ IsSignIn }) {
  return (
    <footer className="pt-2 mt-5 text-center">
      <p className="text-sm text-textMuted">
        {IsSignIn ? "New to the platform?" : "Already have an account?"}
        {"  "}
        <Link
          to={IsSignIn ? "/sign-up" : "/sign-in"}
          className="text-white hover:text-accentSoft font-medium transition-colors duration-200"
        >
          {IsSignIn ? "Create account" : "Sign in"}
        </Link>
      </p>
    </footer>
  );
}
