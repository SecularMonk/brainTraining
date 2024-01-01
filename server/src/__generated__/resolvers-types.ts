import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AnswerId: { input: any; output: any; }
  Date: { input: any; output: any; }
  Difficulty: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
  QuestionId: { input: any; output: any; }
  QuizId: { input: any; output: any; }
  TransactionId: { input: any; output: any; }
  UserId: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  _id?: Maybe<Scalars['String']['output']>;
  answerId: Scalars['AnswerId']['output'];
  correct?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  questionId: Scalars['QuestionId']['output'];
  quizId: Scalars['QuizId']['output'];
  userAnswer: Scalars['String']['output'];
  userId: Scalars['UserId']['output'];
};

export type AnswerInput = {
  answerId: Scalars['AnswerId']['input'];
  createdAt?: InputMaybe<Scalars['Date']['input']>;
  questionId: Scalars['QuestionId']['input'];
  quizId: Scalars['QuizId']['input'];
  userAnswer: Scalars['String']['input'];
  userId: Scalars['UserId']['input'];
};

export type CreateQuizInput = {
  difficulty?: InputMaybe<Scalars['Difficulty']['input']>;
  userId: Scalars['UserId']['input'];
};

export type DictionaryWord = {
  __typename?: 'DictionaryWord';
  word: Scalars['String']['output'];
};

export type Engagements = {
  __typename?: 'Engagements';
  correctAnswer?: Maybe<Scalars['Int']['output']>;
  lastActiveDay?: Maybe<Scalars['Date']['output']>;
  numActiveDays?: Maybe<Scalars['Int']['output']>;
  quizComplete?: Maybe<Scalars['Int']['output']>;
  streakLength?: Maybe<Scalars['Int']['output']>;
  totalAnswers?: Maybe<Scalars['Int']['output']>;
  totalQuestions?: Maybe<Scalars['Int']['output']>;
  totalQuizzes?: Maybe<Scalars['Int']['output']>;
};

export type Event = {
  __typename?: 'Event';
  answerId?: Maybe<Scalars['AnswerId']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  event?: Maybe<Scalars['String']['output']>;
  questionId?: Maybe<Scalars['QuestionId']['output']>;
  quizId?: Maybe<Scalars['QuizId']['output']>;
  userId?: Maybe<Scalars['UserId']['output']>;
};

export type Icon = {
  __typename?: 'Icon';
  _id?: Maybe<Scalars['ObjectId']['output']>;
  base64?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuiz?: Maybe<Quiz>;
  submitAnswer?: Maybe<Scalars['AnswerId']['output']>;
};


export type MutationCreateQuizArgs = {
  input?: InputMaybe<CreateQuizInput>;
};


export type MutationSubmitAnswerArgs = {
  answer?: InputMaybe<AnswerInput>;
};

export type Query = {
  __typename?: 'Query';
  engagements?: Maybe<Engagements>;
  getAnything?: Maybe<Array<Maybe<Icon>>>;
  getQuiz?: Maybe<Quiz>;
  getUser?: Maybe<User>;
  matchWords?: Maybe<Array<Maybe<DictionaryWord>>>;
};


export type QueryEngagementsArgs = {
  userId?: InputMaybe<Scalars['UserId']['input']>;
};


export type QueryGetQuizArgs = {
  userId?: InputMaybe<Scalars['UserId']['input']>;
};


export type QueryGetUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryMatchWordsArgs = {
  word?: InputMaybe<Scalars['String']['input']>;
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['QuestionId']['output'];
  answered?: Maybe<Scalars['Boolean']['output']>;
  availableAnswers: Array<Scalars['String']['output']>;
  correct?: Maybe<Scalars['Boolean']['output']>;
  correctAnswer?: Maybe<Scalars['String']['output']>;
  options: Array<Scalars['String']['output']>;
  problemStatement: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  quizId: Scalars['QuizId']['output'];
  userAnswer?: Maybe<Scalars['String']['output']>;
};

export type Quiz = {
  __typename?: 'Quiz';
  _id: Scalars['QuizId']['output'];
  complete?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['Date']['output'];
  difficulty: Scalars['Difficulty']['output'];
  questions?: Maybe<Array<Maybe<Question>>>;
  rewards?: Maybe<Array<Maybe<Transaction>>>;
  score?: Maybe<Scalars['Float']['output']>;
  userId: Scalars['UserId']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  _id?: Maybe<Scalars['TransactionId']['output']>;
  rewardAmount?: Maybe<Scalars['Int']['output']>;
  rewardType?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['UserId']['output']>;
  engagements?: Maybe<Engagements>;
  username?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Answer: ResolverTypeWrapper<Answer>;
  AnswerId: ResolverTypeWrapper<Scalars['AnswerId']['output']>;
  AnswerInput: AnswerInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateQuizInput: CreateQuizInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DictionaryWord: ResolverTypeWrapper<DictionaryWord>;
  Difficulty: ResolverTypeWrapper<Scalars['Difficulty']['output']>;
  Engagements: ResolverTypeWrapper<Engagements>;
  Event: ResolverTypeWrapper<Event>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Icon: ResolverTypeWrapper<Icon>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<Question>;
  QuestionId: ResolverTypeWrapper<Scalars['QuestionId']['output']>;
  Quiz: ResolverTypeWrapper<Quiz>;
  QuizId: ResolverTypeWrapper<Scalars['QuizId']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionId: ResolverTypeWrapper<Scalars['TransactionId']['output']>;
  User: ResolverTypeWrapper<User>;
  UserId: ResolverTypeWrapper<Scalars['UserId']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Answer: Answer;
  AnswerId: Scalars['AnswerId']['output'];
  AnswerInput: AnswerInput;
  Boolean: Scalars['Boolean']['output'];
  CreateQuizInput: CreateQuizInput;
  Date: Scalars['Date']['output'];
  DictionaryWord: DictionaryWord;
  Difficulty: Scalars['Difficulty']['output'];
  Engagements: Engagements;
  Event: Event;
  Float: Scalars['Float']['output'];
  Icon: Icon;
  Int: Scalars['Int']['output'];
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  Query: {};
  Question: Question;
  QuestionId: Scalars['QuestionId']['output'];
  Quiz: Quiz;
  QuizId: Scalars['QuizId']['output'];
  String: Scalars['String']['output'];
  Transaction: Transaction;
  TransactionId: Scalars['TransactionId']['output'];
  User: User;
  UserId: Scalars['UserId']['output'];
}>;

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  answerId?: Resolver<ResolversTypes['AnswerId'], ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  questionId?: Resolver<ResolversTypes['QuestionId'], ParentType, ContextType>;
  quizId?: Resolver<ResolversTypes['QuizId'], ParentType, ContextType>;
  userAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface AnswerIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AnswerId'], any> {
  name: 'AnswerId';
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DictionaryWordResolvers<ContextType = any, ParentType extends ResolversParentTypes['DictionaryWord'] = ResolversParentTypes['DictionaryWord']> = ResolversObject<{
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DifficultyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Difficulty'], any> {
  name: 'Difficulty';
}

export type EngagementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Engagements'] = ResolversParentTypes['Engagements']> = ResolversObject<{
  correctAnswer?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  lastActiveDay?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  numActiveDays?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quizComplete?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  streakLength?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalAnswers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalQuestions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalQuizzes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  answerId?: Resolver<Maybe<ResolversTypes['AnswerId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  event?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  questionId?: Resolver<Maybe<ResolversTypes['QuestionId']>, ParentType, ContextType>;
  quizId?: Resolver<Maybe<ResolversTypes['QuizId']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['UserId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IconResolvers<ContextType = any, ParentType extends ResolversParentTypes['Icon'] = ResolversParentTypes['Icon']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  base64?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, Partial<MutationCreateQuizArgs>>;
  submitAnswer?: Resolver<Maybe<ResolversTypes['AnswerId']>, ParentType, ContextType, Partial<MutationSubmitAnswerArgs>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  engagements?: Resolver<Maybe<ResolversTypes['Engagements']>, ParentType, ContextType, Partial<QueryEngagementsArgs>>;
  getAnything?: Resolver<Maybe<Array<Maybe<ResolversTypes['Icon']>>>, ParentType, ContextType>;
  getQuiz?: Resolver<Maybe<ResolversTypes['Quiz']>, ParentType, ContextType, Partial<QueryGetQuizArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
  matchWords?: Resolver<Maybe<Array<Maybe<ResolversTypes['DictionaryWord']>>>, ParentType, ContextType, Partial<QueryMatchWordsArgs>>;
}>;

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['QuestionId'], ParentType, ContextType>;
  answered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  availableAnswers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  correctAnswer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  problemStatement?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quizId?: Resolver<ResolversTypes['QuizId'], ParentType, ContextType>;
  userAnswer?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface QuestionIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['QuestionId'], any> {
  name: 'QuestionId';
}

export type QuizResolvers<ContextType = any, ParentType extends ResolversParentTypes['Quiz'] = ResolversParentTypes['Quiz']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['QuizId'], ParentType, ContextType>;
  complete?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['Difficulty'], ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>;
  rewards?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType>;
  score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['UserId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface QuizIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['QuizId'], any> {
  name: 'QuizId';
}

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['TransactionId']>, ParentType, ContextType>;
  rewardAmount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rewardType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TransactionIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TransactionId'], any> {
  name: 'TransactionId';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['UserId']>, ParentType, ContextType>;
  engagements?: Resolver<Maybe<ResolversTypes['Engagements']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UserIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserId'], any> {
  name: 'UserId';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Answer?: AnswerResolvers<ContextType>;
  AnswerId?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  DictionaryWord?: DictionaryWordResolvers<ContextType>;
  Difficulty?: GraphQLScalarType;
  Engagements?: EngagementsResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Icon?: IconResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  QuestionId?: GraphQLScalarType;
  Quiz?: QuizResolvers<ContextType>;
  QuizId?: GraphQLScalarType;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionId?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserId?: GraphQLScalarType;
}>;

