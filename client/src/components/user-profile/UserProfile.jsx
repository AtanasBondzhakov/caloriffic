import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../user-profile/UserProfile.module.css";
import CustomButton from "../ui/custom-button/CustomButton";
import CustomPieChart from "../ui/custom-pie-chart/CustomPieChart";

import { getDailyIntake } from "../../store/slices/dailyIntakeSlice";
import DailyIncomeList from "./daily-income-list/DailyIncomeList.jsx";

export default function UserProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { today } = useSelector(state => state.dailyIntake);

    useEffect(() => {
        dispatch(getDailyIntake())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.title}>Profile Page</div>
            <div className={styles['user-info']}>
                <div className={styles['left-section']}>
                    <div className={styles['daily-progress']}>
                        <p>Daily Progress</p>
                    </div>
                    <div className={styles.pie}>
                        <CustomPieChart user={user} />
                        <p>Pie Chart</p>
                    </div>
                </div>
                <div className={styles['right-section']}>
                    <DailyIncomeList daily={today} />

                    <div className={styles.buttons}>
                        <CustomButton label="Add Product" />
                    </div>

                </div>
            </div>
        </div>
    );
};
