import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../user-profile/UserProfile.module.css";
import CustomButton from "../ui/custom-button/CustomButton";
import CustomPieChart from "../ui/custom-pie-chart/CustomPieChart";

import { getDailyIntake } from "../../store/slices/dailyIntakeSlice";

export default function UserProfile() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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

                    <div className={styles['daily-total']}>
                        <p>List of Daily Income Calories</p>
                    </div>
                    <div className={styles.buttons}>
                        <CustomButton label="Add Product" />
                    </div>

                </div>
            </div>
        </div>
    );
};
