/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-throw-literal */
import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useRef,
  useCallback,
} from "react";

import Toolbar from "../components/employee/Toolbar";
import { useSearchParams } from "react-router-dom";
import useFunction from "../hooks/useFunction";
import { AppContext } from "../context/AppContext";
import DynamicContent from "../components/employee/DynamicContent";
import useFirestore from "../hooks/useFirestore";
import { where } from "firebase/firestore";
import { useScroll } from "framer-motion";

// 🔹 1. Updated Data Generator (Added Description)
const generateEmployees = (count) => {
  const names = [
    "Atikur Rahman",
    "John Doe",
    "Sarah Connor",
    "Ali Hasan",
    "Nadia Islam",
    "Fahim Shahriar",
    "Emily Chen",
    "Michael Scott",
  ];
  const roles = [
    "Frontend Developer",
    "Backend Engineer",
    "UI/UX Designer",
    "Project Manager",
    "DevOps Engineer",
    "QA Tester",
  ];
  const depts = ["Engineering", "Design", "Management", "Operations"];
  const descriptions = [
    "Passionate about crafting scalable frontend architectures and pixel-perfect UIs.",
    "Specializes in robust backend systems and optimizing database queries for high performance.",
    "Creative problem solver focused on delivering intuitive and accessible user experiences.",
    "Experienced in leading agile teams and ensuring timely delivery of complex enterprise projects.",
    "Dedicated to automating deployments, managing cloud infrastructure, and improving system reliability.",
  ];

  return Array.from({ length: count }).map((_, i) => ({
    uid: `emp_${i + 1}`,
    name: names[i % names.length] + (i > 7 ? ` ${i}` : ""),
    email: `emp${i + 1}@dev-ems.com`,
    photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=Emp${i + 1}&backgroundColor=b6e3f4`,
    role: i === 0 ? "admin" : "employee",
    position: roles[i % roles.length],
    department: depts[i % depts.length],
    description: descriptions[i % descriptions.length], // ✅ Description Added
    status: i % 7 === 0 ? "offline" : "active",
    isOnline: i % 4 !== 0,
    location: i % 2 === 0 ? "Dhaka, BD" : "Remote",
    tasksCompleted: Math.floor(Math.random() * 150) + 10,
    joinedWS: Math.floor(Math.random() * 15) + 1,
    performance: Math.floor(Math.random() * 30) + 70,
    requestStatus: i % 12 === 0 ? "pending" : "approved",
  }));
};

const EmployeesPage = () => {
  // 🔹 useContext context
  const { authId, containerRef } = useContext(AppContext);
  const { userDt } = authId;

  // 🔹 Router &&  State
  const [searchParams, setSearchParams] = useSearchParams();
  const [employees, setEmployees] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);
  const [showSortMenuBar, setShowSortMenuBar] = useState(false);

  // 🔹 Employees-State
  // const [searchQuery, setSearchQuery] = useState("");
  // const employees = useMemo(() => generateEmployees(50), []);
  const [employeesGetting, setEmployeesGetting] = useState(false);
  const [lastEmployee, setLastEmployee] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [importedEmployees, setImportedEmployees] = useState(0);

  // 🔹 Custom Hook
  const { paramsUrl, checkUniNessOnArr } = useFunction();
  const { getData, getCount } = useFirestore();

  // 🔹 Ref
  const scrollTriggeredRef = useRef(false);

  useEffect(() => {
    console.log(employeesData);
  }, [employeesData]);

  // -------------------------
  // ✅ Main Work
  // -------------------------
  useEffect(() => {
    document.title = "DevEMS - Employees";

    // 🔹 Get Employees Data
    setEmployeesGetting(true);
    setEmployees([]);
    (async () => {
      try {
        // 1. Get Employee Count
        const { status, count, error } = await getCount({
          collId: "users",
          whereQuery: [where("role", "==", "employee")],
        });
        if (!status) throw { code: error };
        setTotalEmployees(count);

        if (status && count > 0) {

          // 2. Then Check count > 0 tahole Get Data
          const { status, data, lastOne, error } = await getData({
            collId: "users",
            whereQuery: [where("role", "==", "employee")],
            limitt: 10,
          });
          console.log(data);
          let uniDat = checkUniNessOnArr({
            newArr: data,
            oldArr: employees,
          });
          if (status) {
            setImportedEmployees(uniDat.length);
            setEmployees(uniDat);
            if (count > uniDat.length) {
              setLastEmployee(lastOne);
            } else {
              setLastEmployee(null);
            }
          } else throw { code: error };
        } else throw { code: "No Employees" };
      } catch (error) {
        console.log(error);
        setEmployees([]);
        setLastEmployee(null);
      } finally {
        setEmployeesGetting(false);
      }
    })();
  }, [userDt?.uid]);

  // -------------------------
  // ✅ Toolbar Handlers
  // -------------------------

  /* 🔹 Sort Change Function */
  const updateFC = (newFC) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "fc",
      value: newFC,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Sort Change Function */
  const updateSort = (newSort) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "sort",
      value: newSort,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const updateDirection = (newDri) => {
    paramsUrl({
      get: searchParams,
      set: setSearchParams,
      key: "direction",
      value: newDri,
    });
    setShowSortMenuBar(false);
  };

  /* 🔹 Direction Change Function */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      paramsUrl({
        get: searchParams,
        set: setSearchParams,
        key: "q",
        value: value,
      });
    } else {
      paramsUrl({
        type: "del",
        get: searchParams,
        set: setSearchParams,
        key: "q",
      });
    }
  };

  // ----------------------------------------------------
  // ✅ Sync URL with State & Handle Sorting (Logic Fix)
  // ----------------------------------------------------
  useEffect(() => {
    // 1. Sync States from URL
    const FC =
      searchParams.get("fc") === "department"
        ? "department"
        : searchParams.get("fc") === "position"
          ? "position"
          : "name";
    const sort =
      searchParams.get("sort") === "name"
        ? "name"
        : searchParams.get("sort") === "score"
          ? "score"
          : "completedTasks";
    const direction = searchParams.get("direction") === "desc" ? "desc" : "asc";
    const queryTerm = searchParams.get("q") || "";

    let sortedData = [...employees];

    sortedData = employees.filter((item) =>
      item[FC].toLowerCase().includes(queryTerm.toLowerCase()),
    );

    // 2. Sorting Logic
    if (sort === "name") {
      sortedData.sort((a, b) =>
        direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      );
    } else if (sort === "score") {
      sortedData.sort((a, b) => {
        const scoreA = parseFloat(a.performance);
        const scoreB = parseFloat(b.performance);
        return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
      });
    } else {
      sortedData.sort((a, b) =>
        direction === "asc"
          ? a.tasksCompleted - b.tasksCompleted
          : b.tasksCompleted - a.tasksCompleted,
      );
    }
    setEmployeesData(sortedData);
  }, [employees, searchParams]);

  // --------------------------------------
  // ✅ INFINITE SCROLL FOR SUBSCRIPTIONS
  // --------------------------------------
  const { scrollYProgress } = useScroll({ container: containerRef });

  const handleScrollChange = useCallback(
    async (value) => {
      if (
        value > 0.85 &&
        lastEmployee !== null &&
        !scrollTriggeredRef.current
      ) {
        scrollTriggeredRef.current = true;
        setEmployeesGetting(true);

        try {
          if (totalEmployees > importedEmployees) {
            // 1. Then Check count > 0 tahole Get Data
            const getDataa = await getData({
              collId: "users",
              whereQuery: [where("role", "==", "employee")],
              limitt: 10,
              startAfterr: lastEmployee,
            });
            let uniDat = checkUniNessOnArr({
              newArr: getDataa.data,
              oldArr: employees,
            });
            if (getDataa.status) {
              setImportedEmployees(uniDat.length);
              setEmployees(uniDat);
              if (totalEmployees > uniDat.length) {
                setLastEmployee(getDataa.lastOne);
              } else {
                setLastEmployee(null);
              }
            } else throw { code: getDataa.error };
          } else throw { code: "No Employees" };
        } catch (error) {
          console.log(error);
          setEmployees([]);
          setLastEmployee(null);
        } finally {
          setEmployeesGetting(false);
          setTimeout(() => {
            scrollTriggeredRef.current = false;
          }, 1000);
        }
      }
    },
    [employees, importedEmployees, lastEmployee, totalEmployees],
  );

  useEffect(() => {
    if (!scrollYProgress) return;
    const unsubscribe = scrollYProgress.on("change", handleScrollChange);
    return () => unsubscribe?.();
  }, [scrollYProgress, handleScrollChange]);

  return (
    <main className="relative z-50 w-full min-h-screen flex justify-center text-textPrimary h-auto bg-transparent overflow-x-hidden">
      <figure className="w-[95%] xl:w-[90%] 2xl:w-[71%] pt-10">
        {/* Toolbar Section */}
        <Toolbar
          updateFC={updateFC}
          updateSort={updateSort}
          updateDirection={updateDirection}
          handleSearchChange={handleSearchChange}
          showSortMenuBar={showSortMenuBar}
          setShowSortMenuBar={setShowSortMenuBar}
        />
        {/* Dynamic Content Area */}
        <DynamicContent
          employeesGetting={employeesGetting}
          employeesData={employeesData}
          role={userDt?.role}
          searchParams={searchParams}
        />
      </figure>
    </main>
  );
};

export default EmployeesPage;
