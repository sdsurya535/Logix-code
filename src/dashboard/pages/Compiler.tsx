import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Button, Select, SelectItem, Chip } from "@heroui/react";
import {
  Play, Check, ChevronLeft, ChevronRight,
  CircleCheck, CircleX, ChevronDown, ChevronUp,
} from "lucide-react";

/* ═══════════════════════ TYPES ═══════════════════════════════ */
type Difficulty = "Easy" | "Medium" | "Hard";
type Lang = "javascript" | "typescript" | "python";

interface TestCase  { label: string; input: unknown[]; expected: unknown; }
interface Problem {
  id: number; title: string; difficulty: Difficulty; tags: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<Lang, string>;
  testCases: TestCase[];
  fnName: string;
}
interface TestResult {
  label: string; pass: boolean; input: unknown[];
  expected: unknown; result: unknown; error: string | null;
}

/* ═══════════════════════ PROBLEMS ════════════════════════════ */
const PROBLEMS: Problem[] = [
  {
    id: 1, title: "Two Sum", difficulty: "Easy", tags: ["Array", "Hash Table"],
    description: "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers* such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n\n};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n\n};`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [[2,7,11,15], 9], expected: [0,1] },
      { label: "Case 2", input: [[3,2,4], 6],     expected: [1,2] },
      { label: "Case 3", input: [[3,3], 6],        expected: [0,1] },
    ],
    fnName: "twoSum",
  },
  {
    id: 2, title: "Palindrome Number", difficulty: "Easy", tags: ["Math"],
    description: "Given an integer `x`, return `true` if `x` is a **palindrome**, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward. For example, `121` is a palindrome while `123` is not.",
    examples: [
      { input: "x = 121",  output: "true",  explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right it reads -121. From right to left 121-. Not a palindrome." },
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    starterCode: {
      javascript: `/**\n * @param {number} x\n * @return {boolean}\n */\nfunction isPalindrome(x) {\n\n};`,
      typescript: `function isPalindrome(x: number): boolean {\n\n};`,
      python: `def isPalindrome(x: int) -> bool:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [121],   expected: true  },
      { label: "Case 2", input: [-121],  expected: false },
      { label: "Case 3", input: [10],    expected: false },
      { label: "Case 4", input: [12321], expected: true  },
    ],
    fnName: "isPalindrome",
  },
  {
    id: 3, title: "FizzBuzz", difficulty: "Easy", tags: ["Math", "String"],
    description: 'Given an integer `n`, return a **string array** (1-indexed) where:\n\n- `answer[i] == "FizzBuzz"` if `i` is divisible by **3 and 5**.\n- `answer[i] == "Fizz"` if `i` is divisible by **3**.\n- `answer[i] == "Buzz"` if `i` is divisible by **5**.\n- `answer[i] == i` (as a string) if none of the above.',
    examples: [
      { input: "n = 3", output: '["1","2","Fizz"]' },
      { input: "n = 5", output: '["1","2","Fizz","4","Buzz"]' },
    ],
    constraints: ["1 ≤ n ≤ 10⁴"],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {string[]}\n */\nfunction fizzBuzz(n) {\n\n};`,
      typescript: `function fizzBuzz(n: number): string[] {\n\n};`,
      python: `def fizzBuzz(n: int) -> list[str]:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [3],  expected: ["1","2","Fizz"] },
      { label: "Case 2", input: [5],  expected: ["1","2","Fizz","4","Buzz"] },
      { label: "Case 3", input: [15], expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"] },
    ],
    fnName: "fizzBuzz",
  },
  {
    id: 4, title: "Maximum Subarray", difficulty: "Medium", tags: ["Array", "Dynamic Programming"],
    description: "Given an integer array `nums`, find the **subarray** with the largest sum, and return *its sum*.",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6",  explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [5,4,-1,7,8]",             output: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `/**\n * @param {number[]} nums\n * @return {number}\n */\nfunction maxSubArray(nums) {\n\n};`,
      typescript: `function maxSubArray(nums: number[]): number {\n\n};`,
      python: `def maxSubArray(nums: list[int]) -> int:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6  },
      { label: "Case 2", input: [[1]],                      expected: 1  },
      { label: "Case 3", input: [[5,4,-1,7,8]],             expected: 23 },
    ],
    fnName: "maxSubArray",
  },
  {
    id: 5, title: "Climbing Stairs", difficulty: "Easy", tags: ["Dynamic Programming"],
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many **distinct ways** can you climb to the top?",
    examples: [
      { input: "n = 2", output: "2", explanation: "Two ways: 1+1 and 2." },
      { input: "n = 3", output: "3", explanation: "Three ways: 1+1+1, 1+2, and 2+1." },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: {
      javascript: `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n\n};`,
      typescript: `function climbStairs(n: number): number {\n\n};`,
      python: `def climbStairs(n: int) -> int:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [2],  expected: 2  },
      { label: "Case 2", input: [3],  expected: 3  },
      { label: "Case 3", input: [5],  expected: 8  },
      { label: "Case 4", input: [10], expected: 89 },
    ],
    fnName: "climbStairs",
  },
  {
    id: 6, title: "Longest Common Prefix", difficulty: "Easy", tags: ["String"],
    description: 'Write a function to find the **longest common prefix** string amongst an array of strings.\n\nIf there is no common prefix, return an empty string `""`.',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"',  explanation: 'The longest common prefix is "fl".' },
      { input: 'strs = ["dog","racecar","car"]',    output: '""',    explanation: "There is no common prefix." },
    ],
    constraints: ["1 ≤ strs.length ≤ 200", "0 ≤ strs[i].length ≤ 200"],
    starterCode: {
      javascript: `/**\n * @param {string[]} strs\n * @return {string}\n */\nfunction longestCommonPrefix(strs) {\n\n};`,
      typescript: `function longestCommonPrefix(strs: string[]): string {\n\n};`,
      python: `def longestCommonPrefix(strs: list[str]) -> str:\n    pass`,
    },
    testCases: [
      { label: "Case 1", input: [["flower","flow","flight"]],      expected: "fl"    },
      { label: "Case 2", input: [["dog","racecar","car"]],         expected: ""      },
      { label: "Case 3", input: [["interview","inter","interact"]], expected: "inter" },
    ],
    fnName: "longestCommonPrefix",
  },
];

/* ═══════════════════════ HELPERS ═════════════════════════════ */
function runTests(code: string, problem: Problem): TestResult[] {
  return problem.testCases.map((tc) => {
    try {
      const fn = new Function(`"use strict";\n${code}\nreturn ${problem.fnName};`)() as (...a: unknown[]) => unknown;
      const result = fn(...tc.input);
      const pass = JSON.stringify(result) === JSON.stringify(tc.expected);
      return { label: tc.label, pass, input: tc.input, expected: tc.expected, result, error: null };
    } catch (err) {
      return { label: tc.label, pass: false, input: tc.input, expected: tc.expected, result: null, error: String(err) };
    }
  });
}

const DIFF: Record<Difficulty, "success" | "warning" | "danger"> = {
  Easy: "success", Medium: "warning", Hard: "danger",
};

const MD = ({ text }: { text: string }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part))
          return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2,-2)}</strong>;
        if (/^`[^`]+`$/.test(part))
          return <code key={i} className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-[11px] font-mono text-blue-600 dark:text-blue-400">{part.slice(1,-1)}</code>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

/* ═══════════════════════ CUSTOM SPLIT PANES ═════════════════ */
/** Horizontal drag-to-resize: left panel + right panel */
function HSplit({ left, right, defaultLeft = 38 }: {
  left: React.ReactNode; right: React.ReactNode; defaultLeft?: number;
}) {
  const [pct, setPct] = useState(defaultLeft);
  const containerRef  = useRef<HTMLDivElement>(null);
  const dragging      = useRef(false);

  const onMove = useCallback((e: MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const { left: x, width } = containerRef.current.getBoundingClientRect();
    setPct(Math.min(Math.max(((e.clientX - x) / width) * 100, 20), 65));
  }, []);

  const onUp = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [onMove, onUp]);

  return (
    <div ref={containerRef} className="flex h-full w-full overflow-hidden">
      <div style={{ width: `${pct}%` }} className="h-full overflow-hidden shrink-0">
        {left}
      </div>

      {/* Drag handle */}
      <div
        className="w-[5px] h-full shrink-0 bg-slate-100 dark:bg-slate-800 hover:bg-blue-400/40 cursor-col-resize flex items-center justify-center group transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          dragging.current = true;
          document.body.style.cursor = "col-resize";
          document.body.style.userSelect = "none";
        }}
      >
        <div className="w-[3px] h-10 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400 transition-colors" />
      </div>

      <div className="flex-1 h-full overflow-hidden min-w-0">
        {right}
      </div>
    </div>
  );
}

/** Vertical drag-to-resize: top panel + bottom panel */
function VSplit({ top, bottom, defaultTop = 62 }: {
  top: React.ReactNode; bottom: React.ReactNode; defaultTop?: number;
}) {
  const [pct, setPct] = useState(defaultTop);
  const containerRef  = useRef<HTMLDivElement>(null);
  const dragging      = useRef(false);

  const onMove = useCallback((e: MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const { top: y, height } = containerRef.current.getBoundingClientRect();
    setPct(Math.min(Math.max(((e.clientY - y) / height) * 100, 25), 80));
  }, []);

  const onUp = useCallback(() => {
    dragging.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [onMove, onUp]);

  return (
    <div ref={containerRef} className="flex flex-col h-full w-full overflow-hidden">
      <div style={{ height: `${pct}%` }} className="w-full overflow-hidden shrink-0">
        {top}
      </div>

      {/* Drag handle */}
      <div
        className="h-[5px] w-full shrink-0 bg-slate-100 dark:bg-slate-800 hover:bg-blue-400/40 cursor-row-resize flex items-center justify-center group transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          dragging.current = true;
          document.body.style.cursor = "row-resize";
          document.body.style.userSelect = "none";
        }}
      >
        <div className="h-[3px] w-10 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-400 transition-colors" />
      </div>

      <div className="flex-1 w-full overflow-hidden min-h-0">
        {bottom}
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ══════════════════════ */
const Compiler = () => {
  const [problemIdx, setProblemIdx] = useState(0);
  const [lang, setLang]             = useState<Lang>("javascript");
  const [isRunning, setIsRunning]   = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [results, setResults]       = useState<TestResult[] | null>(null);
  const [openCase, setOpenCase]     = useState<string | null>(null);
  const [isDark, setIsDark]         = useState(
    document.documentElement.classList.contains("dark")
  );
  const [codes, setCodes] = useState<Record<number, Record<Lang, string>>>(() => {
    const init: Record<number, Record<Lang, string>> = {};
    PROBLEMS.forEach((p) => { init[p.id] = { ...p.starterCode }; });
    return init;
  });

  const problem = PROBLEMS[problemIdx];
  const code    = codes[problem.id][lang];

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setResults(null); setOpenCase(null); setSubmitted(false);
  }, [problemIdx]);

  const setCode = (val: string) =>
    setCodes((prev) => ({ ...prev, [problem.id]: { ...prev[problem.id], [lang]: val } }));

  const execute = (isSubmit: boolean) => {
    if (lang !== "javascript") return;
    setIsRunning(true); setOpenCase(null);
    setTimeout(() => {
      setResults(runTests(code, problem));
      setSubmitted(isSubmit);
      setIsRunning(false);
    }, 500);
  };

  const passed    = results?.filter((r) => r.pass).length ?? 0;
  const total     = results?.length ?? 0;
  const allPassed = results !== null && passed === total;
  const langFile  = { javascript: "main.js", typescript: "main.ts", python: "main.py" };

  /* ── Panels ── */
  const descriptionPanel = (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      <div className="shrink-0 px-5 py-2.5 border-b border-slate-100 dark:border-slate-800">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Description</span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="space-y-3">
          {problem.description.split("\n\n").map((para, i) => <p key={i}><MD text={para} /></p>)}
        </div>
        <div className="space-y-3">
          {problem.examples.map((ex, i) => (
            <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 p-4 space-y-2">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Example {i + 1}</p>
              <div className="font-mono text-xs space-y-1.5">
                <div><span className="text-slate-400">Input:&nbsp;&nbsp;</span>{ex.input}</div>
                <div><span className="text-slate-400">Output:&nbsp;</span>{ex.output}</div>
                {ex.explanation && <p className="font-sans text-xs text-slate-500 pt-0.5">{ex.explanation}</p>}
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mb-2.5">Constraints</p>
          <ul className="space-y-1.5">
            {problem.constraints.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                <code className="font-mono">{c}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const editorPanel = (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-800 border-b border-slate-700 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs font-mono text-slate-400 ml-1">{langFile[lang]}</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={lang === "python" ? "python" : lang === "typescript" ? "typescript" : "javascript"}
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme={isDark ? "vs-dark" : "light"}
          options={{
            fontSize: 13, minimap: { enabled: false }, scrollBeyondLastLine: false,
            tabSize: 2, lineNumbersMinChars: 3, padding: { top: 14, bottom: 14 },
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            renderLineHighlight: "gutter", overviewRulerLanes: 0,
            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
          }}
          loading={<div className="h-full flex items-center justify-center bg-[#1e1e1e] text-slate-500 text-sm">Loading editor…</div>}
        />
      </div>
    </div>
  );

  const resultsPanel = (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-800 shrink-0">
        {results === null ? (
          <span className="text-xs font-semibold text-slate-500">Test Results</span>
        ) : allPassed ? (
          <div className="flex items-center gap-1.5">
            <CircleCheck size={14} className="text-green-400" />
            <span className="text-xs font-semibold text-green-400">
              {submitted ? "Accepted" : "All tests passed"} · {passed}/{total}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <CircleX size={14} className="text-red-400" />
            <span className="text-xs font-semibold text-red-400">
              {submitted ? "Wrong Answer" : "Tests failed"} · {passed}/{total} passed
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
        {results === null ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-slate-600 font-mono">
              {lang !== "javascript"
                ? `${lang === "python" ? "Python" : "TypeScript"} requires a backend — switch to JavaScript.`
                : "// Press Run to execute your code"}
            </p>
          </div>
        ) : results.map((r) => (
          <div key={r.label}>
            <button
              onClick={() => setOpenCase(openCase === r.label ? null : r.label)}
              className="flex items-center gap-2.5 w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
            >
              {r.pass ? <CircleCheck size={14} className="text-green-400 shrink-0" /> : <CircleX size={14} className="text-red-400 shrink-0" />}
              <span className={`text-xs font-medium ${r.pass ? "text-green-400" : "text-red-400"}`}>{r.label}</span>
              <span className={`text-xs ml-1 ${r.pass ? "text-green-500/50" : "text-red-500/50"}`}>
                {r.pass ? "Accepted" : r.error ? "Runtime Error" : "Wrong Answer"}
              </span>
              <span className="ml-auto text-slate-600">
                {openCase === r.label ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </span>
            </button>
            {openCase === r.label && (
              <div className="px-4 pb-4 pt-1 font-mono text-xs space-y-2 bg-slate-900/60">
                <div className="grid grid-cols-[4.5rem_1fr] gap-1">
                  <span className="text-slate-500">Input</span>
                  <span className="text-slate-300">{r.input.map((v) => JSON.stringify(v)).join(", ")}</span>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] gap-1">
                  <span className="text-slate-500">Expected</span>
                  <span className="text-green-400">{JSON.stringify(r.expected)}</span>
                </div>
                <div className="grid grid-cols-[4.5rem_1fr] gap-1">
                  <span className="text-slate-500">Output</span>
                  <span className={r.pass ? "text-green-400" : "text-red-400"}>
                    {r.error ?? JSON.stringify(r.result)}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* ── Topbar ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 flex-wrap gap-y-1.5">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setProblemIdx((i) => Math.max(0, i - 1))}
            disabled={problemIdx === 0}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
          ><ChevronLeft size={15} /></button>
          <span className="text-xs text-slate-400 font-mono w-8 text-center select-none">
            {problemIdx + 1}/{PROBLEMS.length}
          </span>
          <button
            onClick={() => setProblemIdx((i) => Math.min(PROBLEMS.length - 1, i + 1))}
            disabled={problemIdx === PROBLEMS.length - 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
          ><ChevronRight size={15} /></button>
        </div>

        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        <span className="text-sm font-semibold text-slate-800 dark:text-white">
          {problem.id}. {problem.title}
        </span>
        <Chip size="sm" color={DIFF[problem.difficulty]} variant="flat" className="text-xs font-semibold">
          {problem.difficulty}
        </Chip>
        <div className="hidden md:flex gap-1">
          {problem.tags.map((t) => (
            <Chip key={t} size="sm" variant="flat" className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800">
              {t}
            </Chip>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {lang !== "javascript" && (
            <Chip size="sm" color="warning" variant="flat" className="text-xs font-semibold hidden sm:flex">
              View Only
            </Chip>
          )}
          <Select
            selectedKeys={[lang]}
            onSelectionChange={(keys) => setLang([...keys][0] as Lang)}
            size="sm" radius="lg" variant="bordered" className="w-36"
            classNames={{ trigger: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-8 min-h-8" }}
          >
            <SelectItem key="javascript">JavaScript</SelectItem>
            <SelectItem key="typescript">TypeScript</SelectItem>
            <SelectItem key="python">Python</SelectItem>
          </Select>
          <Button
            size="sm" variant="bordered" radius="lg"
            onPress={() => execute(false)} isLoading={isRunning} isDisabled={lang !== "javascript"}
            startContent={!isRunning && <Play size={13} />}
            className="border-slate-200 dark:border-slate-700 font-semibold h-8"
          >Run</Button>
          <Button
            size="sm" color="success" radius="lg"
            onPress={() => execute(true)} isLoading={isRunning} isDisabled={lang !== "javascript"}
            startContent={!isRunning && <Check size={13} />}
            className="font-semibold h-8 text-white"
          >Submit</Button>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <HSplit
          defaultLeft={38}
          left={descriptionPanel}
          right={
            <VSplit
              defaultTop={62}
              top={editorPanel}
              bottom={resultsPanel}
            />
          }
        />
      </div>
    </div>
  );
};

export default Compiler;
