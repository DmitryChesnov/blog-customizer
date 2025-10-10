import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArrowButton } from '../src/ui/arrow-button';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentState, setCurrentState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleApply = (newState: ArticleStateType) => {
		setCurrentState(newState);
		setIsFormOpen(false);
	};

	const handleFormToggle = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentState.fontFamilyOption.value,
					'--font-size': currentState.fontSizeOption.value,
					'--font-color': currentState.fontColor.value,
					'--container-width': currentState.contentWidth.value,
					'--bg-color': currentState.backgroundColor.value,
				} as CSSProperties
			}>
			<div className={styles.arrowButton}>
				<ArrowButton isOpen={isFormOpen} onClick={handleFormToggle} />
			</div>
			<ArticleParamsForm
				currentState={currentState}
				onApply={handleApply}
				onClose={handleCloseForm}
				isOpen={isFormOpen}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
